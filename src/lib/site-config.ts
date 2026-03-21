import { load } from 'js-yaml';

import siteConfigRaw from '../data/site.yaml?raw';

export interface PlatformDefinition {
  id: string;
  title: string;
  icon: string;
}

export interface PlatformLink extends PlatformDefinition {
  url: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

interface SiteAboutConfig {
  avatar: string;
  project: string[];
  author: string[];
  contact: ContactLink[];
}

export interface SiteConfig {
  author: string;
  albumTitle: string;
  homepageBackground: string;
  homepageIntro: string;
  about: SiteAboutConfig;
  links: PlatformLink[];
}

export interface ResolvedPlatformLink extends PlatformDefinition {
  url: string;
}

const yamlLoad = load as (source: string) => unknown;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(
      `Invalid site config: ${label} must be a non-empty string.`,
    );
  }

  return value;
}

function readStringArray(value: unknown, label: string): string[] {
  if (
    !Array.isArray(value) ||
    value.some((entry) => typeof entry !== 'string')
  ) {
    throw new Error(`Invalid site config: ${label} must be a list of strings.`);
  }

  return value.map((entry, index) => readString(entry, `${label}[${index}]`));
}

function parsePlatformDefinitions(value: unknown): PlatformLink[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid site config: links must be a list.');
  }

  const entries = value as unknown[];

  return entries.map<PlatformLink>((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(
        `Invalid site config: links[${index}] must be an object.`,
      );
    }

    return {
      id: readString(entry.id, `links[${index}].id`),
      title: readString(entry.title, `links[${index}].title`),
      icon: readString(entry.icon, `links[${index}].icon`),
      url: readString(entry.url, `links[${index}].url`),
    };
  });
}

function parseContactLinks(value: unknown): ContactLink[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid site config: about.contact must be a list.');
  }

  const entries = value as unknown[];

  return entries.map<ContactLink>((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(
        `Invalid site config: about.contact[${index}] must be an object.`,
      );
    }

    return {
      label: readString(entry.label, `about.contact[${index}].label`),
      value: readString(entry.value, `about.contact[${index}].value`),
      href: readString(entry.href, `about.contact[${index}].href`),
    };
  });
}

function parseSiteConfig(value: unknown): SiteConfig {
  if (!isRecord(value)) {
    throw new Error('Invalid site config: root must be an object.');
  }

  if (!isRecord(value.about)) {
    throw new Error('Invalid site config: about must be an object.');
  }

  return {
    author: readString(value.author, 'author'),
    albumTitle: readString(value.albumTitle, 'albumTitle'),
    homepageBackground: readString(
      value.homepageBackground,
      'homepageBackground',
    ),
    homepageIntro: readString(value.homepageIntro, 'homepageIntro'),
    about: {
      avatar: readString(value.about.avatar, 'about.avatar'),
      project: readStringArray(value.about.project, 'about.project'),
      author: readStringArray(value.about.author, 'about.author'),
      contact: parseContactLinks(value.about.contact),
    },
    links: parsePlatformDefinitions(value.links),
  };
}

export const siteConfig = parseSiteConfig(yamlLoad(siteConfigRaw));

export function resolveSongPlatforms(
  platformUrls: Record<string, string>,
): ResolvedPlatformLink[] {
  const resolved = siteConfig.links.flatMap((platform) => {
    const url = platformUrls[platform.id];

    return url ? [{ ...platform, url }] : [];
  });

  const configuredIds = new Set(
    siteConfig.links.map((platform) => platform.id),
  );
  const adHocPlatforms = Object.entries(platformUrls)
    .filter(([id]) => !configuredIds.has(id))
    .map(([id, url]) => ({
      id,
      title: id,
      icon: 'link',
      url,
    }));

  return [...resolved, ...adHocPlatforms];
}

import { load } from 'js-yaml';

import siteConfigRaw from '../data/site.yaml?raw';

export interface PlatformDefinition {
  id: string;
  title: string;
  icon: string;
}

interface SiteAboutConfig {
  avatar: string;
  project: string[];
  author: string[];
}

export interface SiteConfig {
  author: string;
  albumTitle: string;
  homepageBackground: string;
  about: SiteAboutConfig;
  links: PlatformDefinition[];
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

function parsePlatformDefinitions(value: unknown): PlatformDefinition[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid site config: links must be a list.');
  }

  const entries = value as unknown[];

  return entries.map<PlatformDefinition>((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(
        `Invalid site config: links[${index}] must be an object.`,
      );
    }

    return {
      id: readString(entry.id, `links[${index}].id`),
      title: readString(entry.title, `links[${index}].title`),
      icon: readString(entry.icon, `links[${index}].icon`),
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
    about: {
      avatar: readString(value.about.avatar, 'about.avatar'),
      project: readStringArray(value.about.project, 'about.project'),
      author: readStringArray(value.about.author, 'about.author'),
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

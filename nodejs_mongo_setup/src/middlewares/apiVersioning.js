import logger from "../utils/logger.js";

const normalizeVersions = (versions) =>
  Array.isArray(versions)
    ? versions.map((v) => v.toLowerCase())
    : [versions.toLowerCase()];

const urlVersioning = (versions) => (req, res, next) => {
  const validVersions = normalizeVersions(versions);

  if (validVersions.some((version) => req.path.startsWith(`/api/${version}`))) {
    return next();
  }

  logger.warn(`Invalid API version in URL: ${req.path}`);
  res.status(404).json({
    success: false,
    error: `Invalid API version in URL. Expected one of: ${validVersions.join(", ")}`,
  });
};

const headerVersioning = (versions) => (req, res, next) => {
  const validVersions = normalizeVersions(versions);
  const requestVersion = req.get("Accept-Version")?.toLowerCase();

  if (requestVersion && validVersions.includes(requestVersion)) {
    return next();
  }

  logger.warn(`Invalid API version in header: ${requestVersion}`);
  res.status(404).json({
    success: false,
    error: `Invalid API version in header. Expected one of: ${validVersions.join(", ")}`,
  });
};

const contentTypeVersioning = (versions) => (req, res, next) => {
  const validVersions = normalizeVersions(versions);
  const contentType = req.get("Content-Type")?.toLowerCase();
  const versionRegex = new RegExp(
    `application/vnd\\.api\\.(${validVersions.join("|")})\\+json`
  );

  if (contentType && versionRegex.test(contentType)) {
    return next();
  }

  logger.warn(`Invalid API version in Content-Type: ${contentType}`);
  res.status(404).json({
    success: false,
    error: `Invalid API version in Content-Type. Expected: application/vnd.api.${validVersions.join(", ")}+json`,
  });
};

export { urlVersioning, headerVersioning, contentTypeVersioning };

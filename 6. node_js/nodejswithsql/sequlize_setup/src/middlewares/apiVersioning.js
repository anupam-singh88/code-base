const urlVersioning = (versions) => (req, res, next) => {
  const validVersions = Array.isArray(versions) ? versions : [versions];

  if (validVersions.some((version) => req.path.startsWith(`/api/${version}`))) {
    return next();
  }

  res.status(404).json({
    success: false,
    error: `Invalid API version. Expected one of: ${validVersions.join(", ")}`,
  });
};

const headerVersioning = (versions) => (req, res, next) => {
  const requestVersion = req.get("Accept-Version")?.toLowerCase();
  const validVersions = Array.isArray(versions)
    ? versions.map((v) => v.toLowerCase())
    : [versions.toLowerCase()];

  if (requestVersion && validVersions.includes(requestVersion)) {
    return next();
  }

  res.status(404).json({
    success: false,
    error: `Invalid API version. Expected one of: ${validVersions.join(", ")}`,
  });
};

const contentTypeVersioning = (versions) => (req, res, next) => {
  const contentType = req.get("Content-Type")?.toLowerCase();
  const validVersions = Array.isArray(versions) ? versions : [versions];

  if (
    contentType &&
    validVersions.some((version) =>
      contentType.match(
        new RegExp(`application/vnd\\.api\\.${version.toLowerCase()}\\+json`)
      )
    )
  ) {
    return next();
  }

  res.status(404).json({
    success: false,
    error: `Invalid API version in Content-Type. Expected: application/vnd.api.${validVersions.join(", ")}+json`,
  });
};

export { urlVersioning, headerVersioning, contentTypeVersioning };

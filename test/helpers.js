function computeUrl(origin) {
  // If on localhost proxy to integration
  if (~origin.indexOf('localhost')) {
    // Don't proxy port 5000
    if (!~origin.indexOf(':5000')) {
      return 'https://integration.familysearch.org';
    }
    return origin;
  }

  // If not on familysearch domain proxy to FamilySearch.org
  // TODO: Extend this to allow third parties to also hit dev
  // references
  if (!~origin.indexOf('familysearch.org')) {
    return 'https://familysearch.org';
  }

  // Otherwise just return the origin
  return origin;
}

# DuckDB GeoZarr Extension - Design Spec

## Overview
Add a new project showcase page to the `/projects` section of the portfolio for the `duckdb_geozarr` GitHub repository. This will use the "Curated Overview Page" approach, leveraging the existing MDX rendering pipeline.

## File Structure
- Directory to be created: `content/projects/`
- New file: `content/projects/duckdb-geozarr.mdx`

## Metadata (Frontmatter)
The MDX file will require the following frontmatter to properly render in the existing `FilterablePostList` and `PostCard` components:
- **title**: "DuckDB GeoZarr Extension"
- **date**: (Current Date)
- **description**: "A Rust-based DuckDB extension providing native support for the GeoZarr OGC standard."
- **tags**: ["rust", "duckdb", "geospatial", "zarr"]

## Page Content
The body of the MDX file will feature:
1. **Description**: A paragraph explaining that the extension allows querying and analyzing cloud-native geospatial multidimensional arrays (GeoZarr) directly within DuckDB, utilizing its analytical capabilities.
2. **Links Section**:
   - Primary Repository Link: `https://github.com/dnf0/duckdb_geozarr`
   - README Link: `https://github.com/dnf0/duckdb_geozarr#readme`

## Implementation Steps
1. Create the `content/projects` directory.
2. Author the `duckdb-geozarr.mdx` file.
3. Verify that the project appears correctly on the `/projects` route and renders the markdown correctly when clicked.

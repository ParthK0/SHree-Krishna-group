import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'data/routes.json');

// In-memory fallback if file system write has permission constraints
let cachedRoutes: any[] = [];

function loadRoutesFromFile(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      cachedRoutes = JSON.parse(data);
      return cachedRoutes;
    }
  } catch (err) {
    console.warn('[RoutesController] Could not read routes.json, using cache:', err);
  }
  return cachedRoutes;
}

function saveRoutesToFile(routes: any[]): void {
  cachedRoutes = routes;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(routes, null, 2), 'utf-8');
  } catch (err) {
    console.error('[RoutesController] Error writing to routes.json:', err);
  }
}

// Initial load
loadRoutesFromFile();

export const getAllRoutes = async (req: Request, res: Response): Promise<void> => {
  const includeDrafts = req.query.includeDrafts === 'true';
  const routes = loadRoutesFromFile();

  const filtered = includeDrafts
    ? routes
    : routes.filter((r: any) => r.status === 'published');

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
};

export const getRouteBySlug = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const routes = loadRoutesFromFile();

  const normalized = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
  const route = routes.find(
    (r: any) =>
      r.slug.toLowerCase() === normalized ||
      r.slug.toLowerCase() === `${normalized}-transport`
  );

  if (!route) {
    res.status(404).json({
      success: false,
      message: `Route '${slug}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: route,
  });
};

export const upsertRoute = async (req: Request, res: Response): Promise<void> => {
  const routeData = req.body;

  if (!routeData.slug || !routeData.fromCity || !routeData.toCity) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: slug, fromCity, and toCity are mandatory.',
    });
    return;
  }

  const routes = loadRoutesFromFile();
  const index = routes.findIndex((r: any) => r.slug.toLowerCase() === routeData.slug.toLowerCase());

  if (index >= 0) {
    routes[index] = { ...routes[index], ...routeData, updatedAt: new Date().toISOString() };
  } else {
    routes.push({ ...routeData, createdAt: new Date().toISOString() });
  }

  saveRoutesToFile(routes);

  res.status(200).json({
    success: true,
    message: `Route '${routeData.slug}' saved successfully`,
    data: routeData,
  });
};

export const deleteRoute = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const routes = loadRoutesFromFile();

  const filtered = routes.filter((r: any) => r.slug.toLowerCase() !== slug.toLowerCase());
  if (filtered.length === routes.length) {
    res.status(404).json({
      success: false,
      message: `Route '${slug}' not found to delete`,
    });
    return;
  }

  saveRoutesToFile(filtered);

  res.status(200).json({
    success: true,
    message: `Route '${slug}' deleted successfully`,
  });
};

// src/server/placesRoutes.ts
import express from "express";
import type { Request, Response } from "express"; // ✅ type-only import
import fetch from "node-fetch";

const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;

// GET /api/places/autocomplete?query=...
router.get(
  "/autocomplete",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const query = (req.query.query as string) ?? "";
      if (!query) {
        res.json({ suggestions: [] });
        return;
      }

      const url =
        "https://maps.googleapis.com/maps/api/place/autocomplete/json" +
        `?input=${encodeURIComponent(query)}` +
        `&types=cafe` +
        `&language=en` +
        `&key=${GOOGLE_API_KEY}`;

      const response = await fetch(url);
      const data = (await response.json()) as any;

      const suggestions =
        (data.predictions ?? []).map((p: any) => ({
          placeId: p.place_id as string,
          description: p.description as string,
        })) ?? [];

      res.json({ suggestions });
    } catch (error) {
      console.error("Autocomplete error", error);
      res.status(500).json({ error: "Failed to fetch autocomplete" });
    }
  }
);

// GET /api/places/:placeId
router.get(
  "/:placeId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const placeId = req.params.placeId;

      const fields = [
        "name",
        "rating",
        "user_ratings_total",
        "formatted_address",
        "opening_hours",
        "website",
        "url",
      ].join(",");

      const url =
        "https://maps.googleapis.com/maps/api/place/details/json" +
        `?place_id=${encodeURIComponent(placeId)}` +
        `&fields=${fields}` +
        `&language=en` +
        `&key=${GOOGLE_API_KEY}`;

      const response = await fetch(url);
      const data = (await response.json()) as any;

      if (data.status !== "OK") {
        res.status(400).json({ error: data.status });
        return;
      }

      const r = data.result;

      res.json({
        name: r.name as string,
        rating: (r.rating ?? 0) as number,
        reviewCount: (r.user_ratings_total ?? 0) as number,
        address: (r.formatted_address ?? "") as string,
        website: r.website as string | undefined,
        isOpenNow: r.opening_hours?.open_now as boolean | undefined,
        googleMapsUrl: r.url as string | undefined,
      });
    } catch (error) {
      console.error("Place details error", error);
      res.status(500).json({ error: "Failed to fetch place details" });
    }
  }
);

export default router;

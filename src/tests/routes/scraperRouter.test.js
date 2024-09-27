const request = require("supertest");
const express = require("express");
const scraperRouter = require("../../routes/scraperRouter");
const scraperService = require("../../services/scraperService");

jest.mock("../../services/scraperService");

const app = express();
app.use("/", scraperRouter);

describe("GET /laptops", () => {
  it("should return laptops when using the default searchTerm", async () => {
    const mock = [
      {
        title: "Lenovo V110-15...",
        price: 321.94,
        description:
          'Lenovo V110-15IAP, 15.6" HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home',
        rating: "3",
        reviews: "5 reviews",
      },
      {
        title: "Lenovo ThinkPa...",
        price: 404.23,
        description:
          'Lenovo ThinkPad E31-80, 13.3" HD, Celeron 3855U 1.6GHz, 4GB, 128GB SSD, Windows 10 Home',
        rating: "1",
        reviews: "12 reviews",
      },
    ];

    scraperService.getLaptops.mockResolvedValue(mock);

    const response = await request(app).get("/laptops");

    expect(scraperService.getLaptops).toHaveBeenCalledWith("lenovo");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mock);
  });

  it("should return laptops when using searchTerm 'asus'", async () => {
    const mock = [
      {
        title: "Asus VivoBook...",
        price: 295.99,
        description:
          'Asus VivoBook X441NA-GA190 Chocolate Black, 14", Celeron N3450, 4GB, 128GB SSD, Endless OS, ENG kbd',
        rating: "3",
        reviews: "14 reviews",
      },
      {
        title: "Asus VivoBook...",
        price: 399,
        description:
          'Asus VivoBook Max X541NA-GQ041 Black Chocolate, 15.6" HD, Pentium N4200 1.1GHz, 4GB, 500GB, Windows 10 Home',
        rating: "1",
        reviews: "4 reviews",
      },
    ];

    scraperService.getLaptops.mockResolvedValue(mock);

    const response = await request(app).get("/laptops?term=asus");

    expect(scraperService.getLaptops).toHaveBeenCalledWith("asus");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mock);
  });

  it("should return an empty array when no laptops are found", async () => {
    scraperService.getLaptops.mockResolvedValue([]);

    const response = await request(app).get("/laptops");

    expect(scraperService.getLaptops).toHaveBeenCalledWith("lenovo");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should handle error and return status 500", async () => {
    scraperService.getLaptops.mockRejectedValue(
      new Error("Erro ao buscar laptops")
    );

    const response = await request(app).get("/laptops");

    expect(scraperService.getLaptops).toHaveBeenCalledWith("lenovo");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Erro ao buscar laptops" });
  });
});

const scraperController = require("../../controllers/scraperController");
const scraperService = require("../../services/scraperService");

jest.mock("../../services/scraperService");

describe("scraperController", () => {
  it("should list laptops when using the default searchTerm", async () => {
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

    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await scraperController.getLaptops(req, res);

    expect(scraperService.getLaptops).toHaveBeenCalledWith("lenovo");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it("should list laptops when using searchTerm 'asus'", async () => {
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

    const req = { query: { term: "asus" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await scraperController.getLaptops(req, res);

    expect(scraperService.getLaptops).toHaveBeenCalledWith("asus");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mock);
  });

  it("should return an empty array when no laptops are found", async () => {
    scraperService.getLaptops.mockResolvedValue([]);

    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await scraperController.getLaptops(req, res);

    expect(scraperService.getLaptops).toHaveBeenCalledWith("lenovo");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should handle error and return status 500", async () => {
    scraperService.getLaptops.mockRejectedValue(
      new Error("Erro ao buscar laptops")
    );

    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await scraperController.getLaptops(req, res);

    expect(scraperService.getLaptops).toHaveBeenCalledWith("lenovo");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar laptops" });
  });
});

const axios = require("axios");
const cheerio = require("cheerio");
const scraperService = require("../../services/scraperService");
const mockData = require("../mock/mockData");

jest.mock("axios");

describe("scraperService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchPage", () => {
    it("should return details when page is scraped successfully", async () => {
      const baseUrl =
        "https://webscraper.io/test-sites/e-commerce/static/computers/laptops";

      axios.get.mockResolvedValue({ data: mockData.laptop });

      const $ = await scraperService.fetchPage(baseUrl);

      const title = $(".title").text();
      const price = $(".price").text();
      const description = $(".description").text();
      const rating = $(".ws-icon-star").length;
      const reviews = $(".review-count").text();

      expect(axios.get).toHaveBeenCalledWith(baseUrl);
      expect(title).toBe("Packard 255 G2");
      expect(price).toBe("$416.99");
      expect(description).toBe(
        `15.6", AMD E2-3800 1.3GHz, 4GB, 500GB, Windows 8.1`
      );
      expect(rating).toBe(2);
      expect(reviews).toBe("2 reviews");
    });

    it("should return null when the request fails", async () => {
      const baseUrl =
        "https://webscraper.io/test-sites/e-commerce/static/computers/laptops";

      axios.get.mockRejectedValue(new Error());

      const $ = await scraperService.fetchPage(baseUrl);

      expect(axios.get).toHaveBeenCalledWith(baseUrl);
      expect($).toBeNull();
    });
  });

  describe("getTotalPages", () => {
    it("should return the total number of pages", async () => {
      const baseUrl =
        "https://webscraper.io/test-sites/e-commerce/static/computers/laptops";

      axios.get.mockResolvedValue({ data: mockData.pagination });

      const totalPages = await scraperService.getTotalPages();

      expect(axios.get).toHaveBeenCalledWith(baseUrl);
      expect(totalPages).toBe(3);
    });

    it("should return 1 if no page is found", async () => {
      const mock = `
        <div class="pagination"></div>
      `;
      const baseUrl =
        "https://webscraper.io/test-sites/e-commerce/static/computers/laptops";

      axios.get.mockResolvedValue({ data: mock });

      const totalPages = await scraperService.getTotalPages();

      expect(axios.get).toHaveBeenCalledWith(baseUrl);
      expect(totalPages).toBe(1);
    });
  });

  describe("sortedLaptops", () => {
    it("should sort laptops by price in ascending order", () => {
      const laptops = [
        { title: "Laptop 1", price: "300.00" },
        { title: "Laptop 2", price: "100.00" },
        { title: "Laptop 3", price: "200.00" },
      ];

      const sorted = scraperService.sortedLaptops(laptops);

      expect(sorted[0].title).toBe("Laptop 2");
      expect(sorted[1].title).toBe("Laptop 3");
      expect(sorted[2].title).toBe("Laptop 1");
    });

    it("should return the original array if an error occurs", () => {
      const laptops = [
        { title: "Laptop 1", price: "300.00" },
        { title: "Laptop 2", price: undefined },
        { title: "Laptop 3", price: "200.00" },
      ];

      const sorted = scraperService.sortedLaptops(laptops);

      expect(sorted).toEqual([...laptops]);
    });
  });

  describe("getLaptopsFromPage", () => {
    it("should return an array of laptops when titles match the searchTerm", () => {
      const $ = cheerio.load(mockData.laptops);

      const searchTerm = "asus";
      const laptops = scraperService.getLaptopsFromPage($, searchTerm);

      expect(laptops.length).toBe(1);
      expect(laptops[0].title).toBe("Asus VivoBook...");
      expect(laptops[0].price).toBe(399);
      expect(laptops[0].description).toBe(
        `Asus VivoBook Max X541NA-GQ041 Black Chocolate, 15.6" HD, Pentium N4200 1.1GHz, 4GB, 500GB, Windows 10 Home`
      );
      expect(laptops[0].rating).toBe("1");
      expect(laptops[0].reviews).toBe("4 reviews");
    });

    it("should return an empty array when no titles match the searchTerm", () => {
      const $ = cheerio.load(mockData.laptops);

      const searchTerm = "Dell";
      const laptops = scraperService.getLaptopsFromPage($, searchTerm);

      expect(laptops.length).toBe(0);
    });

    it("should return an empty array when there are no laptops", () => {
      const mockHtml = `
      <div></div>
    `;

      const $ = cheerio.load(mockHtml);

      const searchTerm = "Dell";
      const laptops = scraperService.getLaptopsFromPage($, searchTerm);

      expect(laptops.length).toBe(0);
    });
  });

  describe("getLaptops", () => {
    it("should return an array of all laptops from all pages when titles matches the searchTerm", async () => {
      const searchTerm = "Asus";
      const laptop1 = {
        title: "Asus VivoBook...",
        price: 399,
        description:
          'Asus VivoBook Max X541NA-GQ041 Black Chocolate, 15.6" HD, Pentium N4200 1.1GHz, 4GB, 500GB, Windows 10 Home',
        rating: "1",
        reviews: "4 reviews",
      };
      const laptop2 = {
        title: "Asus EeeBook R...",
        price: 433.3,
        description:
          'Asus EeeBook R416NA-FA014T, 14" FHD, Pentium N4200, 4GB, 128GB eMMC, Windows 10 Home, Eng kbd',
        rating: "1",
        reviews: "1 reviews",
      };

      axios.get.mockResolvedValueOnce({ data: mockData.pagination });
      axios.get.mockResolvedValueOnce({ data: mockData.laptops });
      axios.get.mockResolvedValueOnce({ data: mockData.laptopsPage2 });

      const laptops = await scraperService.getLaptops(searchTerm);

      expect(laptops.length).toBe(2);
      expect(laptops[0]).toEqual(laptop1);
      expect(laptops[1]).toEqual(laptop2);
    });

    it("should return an empty array when an error occurs while fetching laptops", async () => {
      const searchTerm = "Asus";

      axios.get.mockRejectedValue(new Error());

      const laptops = await scraperService.getLaptops(searchTerm);

      expect(laptops).toEqual([]);
    });
  });
});

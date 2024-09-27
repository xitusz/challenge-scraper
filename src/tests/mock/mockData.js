const mockData = {
  laptop: `
      <div class="col-md-4 col-xl-4 col-lg-4"></div>
        <div class="card thumbnail">
          <div class="product-wrapper card-body">
            <img class="img-fluid card-img-top image img-responsive" alt="item" src="/images/test-sites/e-commerce/items/cart2.png">
            <div class="caption">
              <h4 class="price float-end card-title pull-right">$416.99</h4>
              <h4>
                <a href="/test-sites/e-commerce/static/product/31" class="title" title="Packard 255 G2">Packard 255 G2</a>
              </h4>
              <p class="description card-text">15.6", AMD E2-3800 1.3GHz, 4GB, 500GB, Windows 8.1</p>
            </div>
            <div class="ratings">
              <p class="review-count float-end">2 reviews</p>
              <p data-rating="2">
                <span class="ws-icon ws-icon-star"></span>
                <span class="ws-icon ws-icon-star"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  laptops: `
      <div class="col-md-4 col-xl-4 col-lg-4"></div>
        <div class="card thumbnail">
          <div class="product-wrapper card-body">
            <img class="img-fluid card-img-top image img-responsive" alt="item" src="/images/test-sites/e-commerce/items/cart2.png">
            <div class="caption">
              <h4 class="price float-end card-title pull-right">$416.99</h4>
              <h4>
                <a href="/test-sites/e-commerce/static/product/31" class="title" title="Packard 255 G2">Packard 255 G2</a>
              </h4>
              <p class="description card-text">15.6", AMD E2-3800 1.3GHz, 4GB, 500GB, Windows 8.1</p>
            </div>
            <div class="ratings">
              <p class="review-count float-end">2 reviews</p>
              <p data-rating="2">
                <span class="ws-icon ws-icon-star"></span>
                <span class="ws-icon ws-icon-star"></span>
              </p>
            </div>
          </div>
        </div>
        <div class="card thumbnail">
          <div class="product-wrapper card-body">
            <img class="img-fluid card-img-top image img-responsive" alt="item" src="/images/test-sites/e-commerce/items/cart2.png">
            <div class="caption">
              <h4 class="price float-end card-title pull-right">$399</h4>
              <h4>
                <a href="/test-sites/e-commerce/static/product/45" class="title" title="Asus VivoBook Max">Asus VivoBook...</a>
              </h4>
              <p class="description card-text">Asus VivoBook Max X541NA-GQ041 Black Chocolate, 15.6" HD, Pentium N4200 1.1GHz, 4GB, 500GB, Windows 10 Home</p>
            </div>
            <div class="ratings">
              <p class="review-count float-end">4 reviews</p>
              <p data-rating="1">
                <span class="ws-icon ws-icon-star"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  pagination: `
    <nav>
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="?page=1">1</a></li>
        <li class="page-item"><a class="page-link" href="?page=2">2</a></li>
        <li class="page-item"><a class="page-link" href="?page=3">3</a></li>
        <li class="page-item disabled"><span class="page-link">...</span></li>
      </ul>
    </nav>
  `,
  laptopsPage2: `
    <div class="col-md-4 col-xl-4 col-lg-4">
      <div class="card thumbnail">
        <div class="product-wrapper card-body">
          <img class="img-fluid card-img-top image img-responsive" alt="item" src="/images/test-sites/e-commerce/items/cart2.png">
          <div class="caption">
            <h4 class="price float-end card-title pull-right">$433.3</h4>
            <h4>
              <a href="/test-sites/e-commerce/static/product/77" class="title" title="Asus EeeBook R416NA-FA014T">Asus EeeBook R...</a>
            </h4>
            <p class="description card-text">Asus EeeBook R416NA-FA014T, 14" FHD, Pentium N4200, 4GB, 128GB eMMC, Windows 10 Home, Eng kbd</p>
          </div>
          <div class="ratings">
            <p class="review-count float-end">1 reviews</p>
            <p data-rating="1">
              <span class="ws-icon ws-icon-star"></span>
            </p>
          </div>
        </div>
      </div>
      <div class="card thumbnail">
        <div class="product-wrapper card-body">
          <img class="img-fluid card-img-top image img-responsive" alt="item" src="/images/test-sites/e-commerce/items/cart2.png">
          <div class="caption">
            <h4 class="price float-end card-title pull-right">$436.29</h4>
            <h4>
              <a href="/test-sites/e-commerce/static/product/78" class="title" title="Acer Aspire 3 A315-51">Acer Aspire 3...</a>
            </h4>
            <p class="description card-text">Acer Aspire 3 A315-51, 15.6" HD, Core i3-6006U, 4GB, 1TB, Windows 10 Home</p>
          </div>
          <div class="ratings">
            <p class="review-count float-end">1 reviews</p>
            <p data-rating="1">
              <span class="ws-icon ws-icon-star"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    `,
};

module.exports = mockData;

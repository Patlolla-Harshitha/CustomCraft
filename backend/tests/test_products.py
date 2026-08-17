from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_get_products_status_code():
    """Verify GET /products returns HTTP 200."""
    response = client.get("/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_products_sample_data():
    """Verify GET /products returns expected sample products."""
    response = client.get("/products")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5

    product_names = [p["name"] for p in data]
    expected_names = [
        "Custom T-Shirt",
        "Custom Hoodie",
        "Custom Coffee Mug",
        "Custom Phone Case",
        "Custom Tote Bag",
    ]
    for name in expected_names:
        assert name in product_names


def test_get_product_by_id_success():
    """Verify GET /products/{id} returns a valid product."""
    # First fetch list to get a valid product ID
    response = client.get("/products")
    assert response.status_code == 200
    products = response.json()
    assert len(products) > 0

    first_product_id = products[0]["id"]
    detail_response = client.get(f"/products/{first_product_id}")
    assert detail_response.status_code == 200

    product_data = detail_response.json()
    assert product_data["id"] == first_product_id
    assert "name" in product_data
    assert "category" in product_data
    assert "base_price" in product_data
    assert "description" in product_data


def test_get_product_by_invalid_id_not_found():
    """Verify GET /products/{invalid_id} returns HTTP 404."""
    invalid_id = 999999
    response = client.get(f"/products/{invalid_id}")
    assert response.status_code == 404
    error_data = response.json()
    assert "detail" in error_data
    assert f"Product with ID {invalid_id} not found" in error_data["detail"]

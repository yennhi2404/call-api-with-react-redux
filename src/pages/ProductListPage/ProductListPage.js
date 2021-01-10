import ProductList from "./../../components/ProductList/ProductList";
import ProductItem from "./../../components/ProductItem/ProductItem";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  actDeleteProductRequest,
  actFetchProductsRequest,
} from "../../actions";

function ProductListPage({ products, fetchAllProducts, onDeleteProduct }) {
  const showProducts = (products) => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
            index={index}
            onDelete={onDelete}
          />
        );
      });
    }
    return result;
  };

  useEffect(() => {
    //console.log("componentDidMount");
    //callApi("products", "GET", null).then((res) => {
    //setProducts(res.data);
    //});
    fetchAllProducts();
  }, []);
  // console.log("render");

  const onDelete = (id) => {
    onDeleteProduct(id);
  };

  return (
    <div className="container">
      <div className="col-sx-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info mb-10">
          Thêm sản phẩm
        </Link>
        <ProductList showProducts={showProducts(products)}></ProductList>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    onDeleteProduct: (id) => {
      dispatch(actDeleteProductRequest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

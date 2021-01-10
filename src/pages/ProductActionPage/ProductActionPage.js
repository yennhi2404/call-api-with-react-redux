import { useState, useEffect } from "react";
import callApi from "./../../utils/apiCaller";
import { Link } from "react-router-dom";
import {
  actAddProductRequest,
  actGetProductRequest,
  actUpdateProductRequest,
} from "./../../actions/index";
import { connect } from "react-redux";

function ProductActionPage({
  match,
  history,
  onAddProduct,
  onEditProduct,
  onUpdateProduct,
}) {
  const [id, setId] = useState("");
  const [txtName, settxtName] = useState("");
  const [txtPrice, settxtPrice] = useState("");
  const [chkbStatus, setchkbStatus] = useState("");

  const onChangeName = (e) => {
    settxtName(e.target.value);
  };

  const onChangePrice = (e) => {
    settxtPrice(e.target.value);
  };
  const onChangeStatus = (e) => {
    var target = e.target;
    var value = target.type === "checkbox" ? target.checked : target.value;
    setchkbStatus(value);
  };

  const onSave = (e) => {
    e.preventDefault();
    var product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus,
    };
    if (id) {
      onUpdateProduct(product);
      // // http://localhost:3000/products/:id => HTTP Method: PUT
      // callApi(`products/${id}`, "PUT", {
      //   name: txtName,
      //   price: txtPrice,
      //   status: chkbStatus,
      // }).then((res) => {
      //   history.goBack();
      // });
      //   console.log("updating...");
    } else {
      // callApi("products", "POST", {
      //   name: txtName,
      //   price: txtPrice,
      //   status: chkbStatus,
      // }).then((res) => {
      //   //console.log(res);
      //   history.goBack();
      // });
      onAddProduct(product);
    }
    history.goBack();
  };

  useEffect(() => {
    // console.log("componentDidMount");
    if (match) {
      var id = match.params.id;
      onEditProduct(id);
      //console.log(id);
      // callApi(`products/${id}`, "GET", null).then((res) => {
      //   //console.log(res.data);
      //   var data = res.data;
      // setId(match.params.id);
      // settxtName(match.params.name);
      // settxtPrice(match.params.price);
      // setchkbStatus(match.params.status);
      // });
    }
  }, []);

  return (
    <div className="col-sx-6 col-sm-6 col-md-6 col-lg-6">
      <form onSubmit={onSave}>
        <div className="form-group">
          <label>Tên sản phẩm: </label>
          <input
            type="text"
            className="form-control"
            name="txtName"
            value={txtName}
            onChange={onChangeName}
          />
        </div>
        <div className="form-group">
          <label>Giá: </label>
          <input
            type="number"
            className="form-control"
            name="txtPrice"
            value={txtPrice}
            onChange={onChangePrice}
          />
        </div>
        <div className="form-group">
          <label>Trạng thái: </label>
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              name="chkbStatus"
              value={txtPrice}
              onChange={onChangeStatus}
              checked={chkbStatus}
            />
            Còn hàng
          </label>
        </div>
        <Link to="/product-list" className="btn btn-danger mr-10">
          Trở lại
        </Link>
        <button type="submit" className="btn btn-primary">
          Lưu lại
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemEditing: state.itemEditing,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product));
    },
    onEditProduct: (id) => {
      dispatch(actGetProductRequest(id));
    },
    onUpdateProduct: (product) => {
      dispatch(actUpdateProductRequest(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);

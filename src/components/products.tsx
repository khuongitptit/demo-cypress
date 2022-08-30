import axios from 'axios';
import React, { useEffect, useState } from 'react';
const PRODUCT_BASE_API_URL = process.env.REACT_APP_BASE_API_URL + '/products';
const About: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [productToAdd, setProductToAdd] = useState({ name: '', price: 0 });
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    await axios.get(PRODUCT_BASE_API_URL).then((res) => {
      setProducts(res.data);
    });
  };
  const handleAdd = async () => {
    await axios.post(PRODUCT_BASE_API_URL, productToAdd);
    await getList();
  };
  const handleDelete = async (id: number) => {
    await axios.delete(`${PRODUCT_BASE_API_URL}/${id}`);
    await getList();
  };
  return (
    <div>
      <div>
        <h6>Add product</h6>
        <input
          name="name"
          placeholder="Enter product name"
          value={productToAdd.name}
          onChange={(e) =>
            setProductToAdd({ ...productToAdd, name: e.target.value })
          }
        />
        <input
          name="price"
          type="number"
          placeholder="Enter product price"
          value={productToAdd.price}
          onChange={(e) =>
            setProductToAdd({ ...productToAdd, price: +e.target.value })
          }
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default About;

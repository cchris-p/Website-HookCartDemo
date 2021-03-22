/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllPages,
  createPage,
  updatePages,
  deletePages as deletePagesAction,
} from '../../actions';
import CheckboxTree from 'react-checkbox-tree';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdatePagesModal from './components/UpdatePagesModal';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

/**
 * @author
 * @function NewPage
 **/

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageList, setPageList] = useState([]);

  const [pageDetailsModal, setPageDetailsModal] = useState(false);
  const [pageDetails, setPageDetails] = useState(null);

  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      setTitle('');
      setCategoryId('');
      setDesc('');
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    if (title === '') {
      alert('Title is required');
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });
    products.forEach((product, index) => {
      form.append('products', product);
    });

    dispatch(createPage(form));
  };

  useEffect(() => setPageList(page.pages));

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder={'Select Category'}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Page Title'}
                className=""
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={'Page Desc'}
                className=""
              />
            </Col>
          </Row>
          <p style={{ marginBottom: '-3px' }}>Banners</p>
          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>
          <p style={{ marginBottom: '-3px' }}>Products</p>
          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };

  const renderPageList = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {page.pages.length > 0
            ? page.pages.map((page, index) => (
                <tr key={index}>
                  <td>{page._id}</td>
                  <td>{page.title}</td>
                  <td>{page.description}</td>
                  <td>{page.category}</td>
                  <td>
                    <button onClick={() => showPageDetailsModal(page)}>
                      info
                    </button>
                    <button
                      onClick={() => {
                        // const payload = {
                        //   productId: product._id,
                        // };
                        // dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const handleClosePageDetailsModal = () => {
    setPageDetailsModal(false);
  };

  const showPageDetailsModal = (product) => {
    setPageDetails(product);
    setPageDetailsModal(true);
  };

  const renderPageDetailsModal = () => {
    if (!pageDetails) {
      return null;
    }

    return (
      <Modal
        show={pageDetailsModal}
        handleClose={handleClosePageDetailsModal}
        onSubmit={handleClosePageDetailsModal}
        modalTitle={'Page Details'}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{pageDetails.title}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{pageDetails.category}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{pageDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <Col>
              <label className="key">Banner Pictures</label>
              <div
                style={{
                  display: 'block',
                  flexDirection: 'column',
                  margin: '0 auto',
                }}
              >
                <div className="bannerImgContainer">
                  {pageDetails.banners.map((picture) => (
                    <img src={generatePublicUrl(picture.img)} alt="" />
                  ))}
                </div>
              </div>
            </Col>
            <Col>
              <label className="key">Products</label>
              <div style={{ display: 'flex' }}>
                <div className="productImgContainer">
                  {pageDetails.products.map((product) => (
                    <div>
                      <img src={generatePublicUrl(product._id)} alt="" />
                      <img src={generatePublicUrl(product.img)} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </div>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating Page...please wait</p>
      ) : (
        <>
          {/* {renderCreatePageModal()} */}
          {/* <button onClick={() => setCreateModal(true)}>Create Page</button> */}
          <Container>
            <Row>
              <Col md={12}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h3>Page</h3>
                </div>
              </Col>
            </Row>
            <Row>
              {/* {console.log('PAGE == ', pageList)} */}
              <Col>{renderPageList()}</Col>
            </Row>
          </Container>
        </>
      )}
      {renderPageDetailsModal()}
    </Layout>
  );
};

export default NewPage;

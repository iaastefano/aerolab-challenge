import React, { useState, useEffect } from 'react';
import { Divider, message, Spin} from 'antd';
import { connect } from 'react-redux';
import { getAuthProfile, IProfile } from '../../state/auth';
import { IProduct } from '../../no-state/products/models';
import { IGlobalState } from '../../state';
import ProductService from '../../services/ProductService';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface HomeProps {
  profile?: IProfile;
}

const Home: React.FC<HomeProps & RouteComponentProps> = ({
  profile,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isProductsLoaded, setIsProductsLoaded] = useState(false);

  useEffect(
    () => {
      const unique = (value: any, index: any, self: any) => {
        return self.indexOf(value) === index
      }

      const fetchProducts = async () => {
        try {

          setIsLoading(true);

          const response = await ProductService.fetch();

          setProducts(response);

          let categories = response.map(product => product.category);
 
          setCategories(categories.filter(unique));

        } catch (error) {
          if (error.message) {
            message.error(error.message);
          }
        } finally {
          setIsProductsLoaded(true);
          setIsLoading(false);
        }
      };

      if(!isProductsLoaded){
        fetchProducts();
      }
    },
  );

  return (
    <>
      {isLoading ? (
        <div className="spin-container">
          <Spin />
        </div>
      ) : (
        <div>
          PRODUCTS
          <Divider></Divider>
          {products.map(product => (
            <>
            <span>
              {product.name}
            </span>
            <Divider></Divider>
            </>
          ))}
          CATEGORIES
          <Divider></Divider>
          {categories.map(category => (
            <>
            <span>
              {category}
            </span>
            <Divider></Divider>
            </>
          ))}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  profile: getAuthProfile(state),
});

export default withRouter(connect(mapStateToProps)(Home));

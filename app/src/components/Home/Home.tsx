import React, { useState, useEffect } from 'react';
import { message, Spin} from 'antd';
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

  useEffect(
    () => {
      const fetchProducts = async () => {
        try {

          setIsLoading(true);

          const response = await ProductService.fetch();

          setProducts(response);

        } catch (error) {
          if (error.message) {
            message.error(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
    },
  );

  return (
    <>
      {isLoading ? (
        <div className="spin-container">
          <Spin />
        </div>
      ) : (
        <>
        PRODUCTS
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  profile: getAuthProfile(state),
});

export default withRouter(connect(mapStateToProps)(Home));

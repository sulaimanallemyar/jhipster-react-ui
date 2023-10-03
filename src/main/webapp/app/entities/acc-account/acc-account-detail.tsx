import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import PCol from 'app/modules/utils/pcol';

export const AccAccountDetail = props => {
  const handleClose = () => {
    props.closeDialog();
  };

  const accAccountEntity = props.currentAccount;

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="accAccountDetailsHeading">Customer Details</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{accAccountEntity.name}</dd>

          <dt>
            <span>Last Name</span>
          </dt>
          <dd>{accAccountEntity.lastName}</dd>
          <dt>
            <span id="name">Father Name</span>
          </dt>
          <dd>{accAccountEntity.fatherName}</dd>
        </dl>

        <Button color="danger" onClick={() => handleClose()}>
          <FontAwesomeIcon icon="ban" /> <span className="d-none d-md-inline">Close</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AccAccountDetail;

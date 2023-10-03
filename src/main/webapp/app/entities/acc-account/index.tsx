import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AccAccount from './acc-account';
import AccAccountDetail from './acc-account-detail';
import AccAccountUpdate from './acc-account-update';
import AccAccountDeleteDialog from './acc-account-delete-dialog';

const AccAccountRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AccAccount />} />
    <Route path="new" element={<AccAccountUpdate />} />
    <Route path=":id">
      <Route index element={<AccAccountDetail />} />
      <Route path="edit" element={<AccAccountUpdate />} />
      <Route path="delete" element={<AccAccountDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AccAccountRoutes;

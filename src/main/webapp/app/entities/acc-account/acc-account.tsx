import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState, JhiPagination, JhiItemCount, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Dialog } from 'primereact/dialog';
import { IRootState } from 'app/shared/reducers';
import { deleteEntity, getEntities } from './acc-account.reducer';
import AccAccountUpdate from './acc-account-update';
import { useSelector } from 'react-redux';
import { Checkbox } from 'primereact/checkbox';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import AccAccountDetail from './acc-account-detail';

export const AccAccount = () => {
  const dispatch = useAppDispatch();

  const updateSuccess = useSelector(({ accAccount }: IRootState) => accAccount.updateSuccess);
  const [createDialog, setCreateDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [viewDialog, setViewDialog] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const accAccountList = useAppSelector(state => state.accAccount.entities);
  const loading = useAppSelector(state => state.accAccount.loading);
  const totalItems = useAppSelector(state => state.accAccount.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    if (updateSuccess) getAllEntities();
  }, [updateSuccess]);

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const updateEntity = rowData => {
    setCurrentAccount(rowData);
    setUpdateDialog(true);
  };

  const viewEntity = rowData => {
    setCurrentAccount(rowData);
    setViewDialog(true);
  };

  const showDeleteConfirmation = id => {
    confirmDialog({
      message: 'Delete Confirmation',
      header: 'Are you sure to procced?',
      acceptClassName: 'p-button-danger',
      accept: () => {
        dispatch(deleteEntity(id));
      },
    });
  };

  return (
    <div>
      <h2 id="acc-account-heading" data-cy="AccAccountHeading">
        {/* <Translate contentKey="sarafSystemApp.accAccount.home.title">Acc Accounts</Translate> */}
        Customers
        <div className="d-flex" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Button className="me-2" color="info" onClick={() => setCreateDialog(true)}>
            <FontAwesomeIcon icon="plus" />
            {/* <Translate contentKey="sarafSystemApp.accAccount.home.createLabel">Refresh List</Translate> */} Create
          </Button>
        </div>
      </h2>
      <div className="table-responsive">
        {accAccountList && accAccountList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('name')}>
                  Name
                </th>
                <th>LastName</th>
                <th>Note</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accAccountList.map((accAccount, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{accAccount.name}</td>
                  <td>{accAccount.lastName}</td>
                  <td>{accAccount.note}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button onClick={() => viewEntity(accAccount)} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>

                      <Button onClick={() => updateEntity(accAccount)} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>

                      <Button onClick={() => showDeleteConfirmation(accAccount.id)} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              {/* <Translate contentKey="sarafSystemApp.accAccount.home.notFound">No Acc Accounts found</Translate> */}
              No Records found
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={accAccountList && accAccountList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}

      <Dialog
        showHeader={false}
        visible={createDialog}
        onHide={() => setCreateDialog(false)}
        style={{ width: '70vw' }}
        contentStyle={{ borderRadius: '10px', overflowX: 'visible' }}
      >
        <AccAccountUpdate closeDialog={() => setCreateDialog(false)}></AccAccountUpdate>
      </Dialog>
      <Dialog
        showHeader={false}
        visible={updateDialog}
        onHide={() => setUpdateDialog(false)}
        style={{ width: '70vw' }}
        contentStyle={{ borderRadius: '10px', overflowX: 'visible' }}
      >
        <AccAccountUpdate currentAccount={currentAccount} closeDialog={() => setUpdateDialog(false)}></AccAccountUpdate>
      </Dialog>

      <Dialog
        showHeader={false}
        visible={viewDialog}
        onHide={() => setViewDialog(false)}
        style={{ width: '70vw' }}
        contentStyle={{ borderRadius: '10px', overflowX: 'visible' }}
      >
        <AccAccountDetail currentAccount={currentAccount} closeDialog={() => setViewDialog(false)}></AccAccountDetail>
      </Dialog>

      <ConfirmDialog />
    </div>
  );
};

export default AccAccount;

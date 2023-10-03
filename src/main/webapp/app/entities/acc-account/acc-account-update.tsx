import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IRootState } from 'app/shared/reducers';
// import { getEntities as getAccountTypes } from 'app/entities/account-type/account-type.reducer';
// import { getEntities as getCurrencies } from 'app/entities/currency/currency.reducer';
// import { getEntities as getBranches } from 'app/entities/branch/branch.reducer';

import { getEntities as getAccAccounts } from 'app/entities/acc-account/acc-account.reducer';
import { getEntity, updateEntity, createEntity, reset } from './acc-account.reducer';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PRow from 'app/modules/utils/prow';
import PCol from 'app/modules/utils/pcol';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';

export const AccAccountUpdate = props => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [initBalance, setInitBalance] = useState<boolean>(false);
  const [equityAcc, setEquityAcc] = useState([]);

  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const updating = useAppSelector(state => state.accAccount.updating);
  const updateSuccess = useSelector((state: IRootState) => state.accAccount.updateSuccess);

  const handleClose = () => {
    props.closeDialog();
  };

  useEffect(() => {
    if (updateSuccess) {
      formik.resetForm();
      handleClose();
    }
  }, [updateSuccess]);

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const validationSchemma = yup.object().shape({
    name: yup.string().required(translate('entity.validation.required')),
  });

  const formik = useFormik({
    initialValues: props.currentAccount
      ? {
          name: props.currentAccount.name,
          lastName: props.currentAccount.lsatName,
          note: props.currentAccount.note,
        }
      : {
          name: '',
          lastName: '',
          note: null,
        },
    validationSchema: validationSchemma,
    validateOnChange: true,
    validateOnBlur: true,
    validate(values) {
      const error: any = {};

      Object.keys(error).forEach(p => {
        if (error[p] === null) {
          delete error[p];
        }
      });
      return error;
    },

    onSubmit(data) {
      const _tmp = new Date();
      date.setHours(_tmp.getHours(), _tmp.getMinutes());
      if (props.currentAccount) {
        dispatch(
          updateEntity({
            ...data,
            // accountType: accountTypes.find(a => a.id === props.currentAccount.accountType?.id),
            // currency: currencies.find(c => c.id === props.currentAccount.currency?.id),
            // initialBalanceFromAccount: equityAcc.find(e => e.id === props.currentAccount.fromAccount?.id),
            id: props.currentAccount.id,
          })
        );
      } else {
        dispatch(
          createEntity({
            ...data,
            // accountType: accountTypes.find(p => p.id === data.accountType),
            // currency: currencies.find(p => p.id === data.currency),
            // initialBalanceFromAccount: equityAcc.find(p => p.id === data.initialBalanceFromAccount),
            // branch: defaultBranch,
          })
        );
      }
    },
  });

  return (
    <div className="p-mt-5">
      <form id="submit-form" onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
        <PRow className="p-fluid p-formgrid grid">
          <PCol col="6" md="2" className="p-field p-flex mt-4">
            <label id="nameLabel" htmlFor="name">
              Name
            </label>
            <InputText
              id="name"
              type="text"
              name="name"
              className={getFormErrorMessage('name') ? 'p-invalid' : ''}
              value={formik.values.name}
            />
            <div className="p-d-flex">{getFormErrorMessage('name')}</div>
          </PCol>

          <PCol col="6" md="2" className="p-field p-flex mt-4">
            <label id="nameLabel" htmlFor="lastName">
              Last Name
            </label>
            <InputText
              id="lastName"
              type="text"
              name="lastName"
              className={getFormErrorMessage('lastName') ? 'p-invalid' : ''}
              value={formik.values.lastName}
            />
            <div className="p-d-flex">{getFormErrorMessage('lastName')}</div>
          </PCol>
          <PCol col="6" className="p-field mt-3">
            <label id="noteLabel" htmlFor="accounts-note">
              {/* <Translate contentKey="sarafSystemApp.accAccount.note">Note</Translate> */}
              Note
            </label>
            <InputTextarea id="accounts-note" name="note" value={formik.values.note} />
          </PCol>
        </PRow>

        <Divider />

        <PCol md="4" col="12" className="d-flex justify-content-end">
          <Button color="danger" data-cy="entityCreateSaveButton" onClick={() => handleClose()}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            {/* <Translate contentKey="entity.action.close">Close</Translate> */}
            Close
          </Button>
          &nbsp;
          <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
            <FontAwesomeIcon icon="save" />
            &nbsp;
            <Translate contentKey="entity.action.save">Save</Translate>
          </Button>
        </PCol>
      </form>
    </div>
  );
};

export default AccAccountUpdate;

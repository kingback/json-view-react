import React from 'react';
import ReactDOM from 'react-dom';
import JSONView from '../src';
import './index.css';

const json = {
  message: '操作成功',
  code: 200,
  status: 1,
  data: {
    customerId: 86,
    customerBaseInfo: {
      customerId: 91,
      customerName: 'l9vrh',
      customerType: 40,
      cityId: -25,
      cityName: 'kul9',
      countyId: -84,
      countyName: '3mgw0',
      customerStatus: 24,
      source: 63,
      sourceId: 17,
      provinceId: -123,
      provinceName: 'bnp',
      offlineReasonId: -93,
      offlineReason: 'm3z',
      poiSource: -105,
      accountId: -109,
      accountOrigin: 54
    },
    deliveryAddressInfoList: [
      {
        addressId: 94,
        customerId: -122,
        poiId: -83,
        recipientName: 'x8e9',
        cityId: 44,
        countyId: -122,
        cityName: 'vc2vcg',
        countyName: '7l4d',
        mapPoiName: 'madqk',
        longitude: 91,
        latitude: -115,
        defaultFlag: true,
        deliveryBillType: 89,
        provinceId: -118,
        provinceName: 'l6z'
      }
    ],
    groupMarkList: ['客群标签1', '客群标签2'],
    isBlock: true,
    isCateringLabel: false
  }
};

document.body.appendChild(document.createElement('div'));
ReactDOM.render(<JSONView json={json} />, document.querySelector('div'));

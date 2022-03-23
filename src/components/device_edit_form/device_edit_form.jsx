import React, {useState} from 'react';
import styles from './device_edit_form.module.css';
import { VscClose } from "react-icons/vsc";
import Slider from "@mui/material/Slider";
import Radio from '@mui/material/Radio';
import { pink } from '@mui/material/colors';

const DeviceEditForm = ({deviceService, editDeviceInfo, onCancel}) => {

  const [ths, setThs] = useState(editDeviceInfo.ths);
  const [typ, setTyp] = useState(editDeviceInfo.typ);

  const updateDevice = async () => {
    await deviceService.updateDeviceSetting(editDeviceInfo.id, ths, typ, () => {
      alert("잘못된 접근입니다.");
    });
    onCancel();
  };

  const marks = [
    {
      value: 0,
      label: '항상꺼짐',
    },
    {
      value: 1000,
      label: '항상켜짐',
    },
  ];

  const handleSliderChange = (event, newThs) => {
    setThs(Number(newThs));
  }

  const handleRadioChange = (event) => {
    setTyp(Number(event.target.value));
  }

  return(
    <section className={styles.edit_form}>
      <div className={styles.wrap}>
        <div className={styles.close_wrap}>
          <button onClick={onCancel} className={styles.close}>
            <VscClose className={styles.icon}/>
          </button>
        </div>
        <h1>{editDeviceInfo.id}</h1>
        <div className={styles.slider_wrap}>
          <Slider
            defaultValue={editDeviceInfo.ths}
            aria-label="Default"
            valueLabelDisplay="on"
            marks={marks}
            min={0}
            max={1000}
            value={typeof ths === 'number' ? ths : 0}
            onChange={handleSliderChange}
            color="secondary"
          />
        </div>
        <div className={styles.radio_wrap}>
          <Radio
            checked={typ === 0}
            onChange={handleRadioChange}
            value={0}
            name="radio-buttons"
            color="secondary"
          />
          <p className={styles.p}>단방향</p>
          <img src="./images/oneway.svg"/>
        </div>
        <div className={styles.radio_wrap}>
          <Radio
            checked={typ === 1}
            onChange={handleRadioChange}
            value={1}
            name="radio-buttons"
            color="secondary"
          />
          <p className={styles.p}>양방향</p>
          <img src="./images/twoway.svg"/>
        </div>
        <button type="submit" onClick={updateDevice} className={styles.button}>완료</button>
      </div>
    </section>
  );
}

export default DeviceEditForm;
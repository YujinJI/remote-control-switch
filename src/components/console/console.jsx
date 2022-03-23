import React, {useEffect, useState} from 'react';
import styles from './console.module.css';
import {useHistory} from "react-router-dom";
import Device from "../device/device";
import DeviceEditForm from "../device_edit_form/device_edit_form";
import Header from "../header/header";
import { FaPlusCircle } from "react-icons/fa";

const Console = ({authService, deviceService}) => {

  const [deviceList, setDeviceList] = useState([]);
  const [addDeviceId, setAddDeviceId] = useState("");
  const [editDeviceInfo, setEditDeviceInfo] = useState(null);
  const [isButton, setIsButton] = useState(false);

  const history = useHistory();

  useEffect(() => {
    authService.onAuthChange(async (user) => {
      await deviceService.clear();
      if (user) {
        deviceService.onListChange((list) => {
          setDeviceList(list);
        });
      } else {
        goToLogin();
      }
    });
  }, [authService, deviceService]);

  const goToLogin = () => {
    history.push({
      pathname: './'
    });
  };

  const logout = () => {
    authService.logout().then(goToLogin);
  };

  const clickButton = () => {
    setIsButton(isButton => !isButton);
  }

  const addDevice = async () => {
    await deviceService.addDevice(addDeviceId, () => {
      alert("등록된 기기가 없거나 이미 등록된 기기입니다.");
      setAddDeviceId("");
    });
    setAddDeviceId("");
    setIsButton(isButton => !isButton);
  };

  const onChangeHandler = (event) => {
    setAddDeviceId(event.target.value);
  };

  const onDeviceEditHandler = (deviceInfo) => {
    setEditDeviceInfo(deviceInfo);
  }

  const onDeviceEditCancelHandler = () => {
    setEditDeviceInfo(null);
  }

  return(
    <section className={styles.console}>
      <img src="/images/background_light3.jpg" className={styles.background}/>
      <Header logout={logout}/>
      <div className={styles.plus_wrap}>
        <button className={`${styles.add_button} ${isButton ? styles.act : null}`} onClick={clickButton}>
          <FaPlusCircle className={styles.plus}/>
        </button>
        <div className={`${styles.add_form} ${isButton ? styles.act : null}`}>
          <h1>Add Device Form</h1>
          <input type="text" onChange={onChangeHandler} value={addDeviceId} placeholder="기기 ID를 입력해주세요." className={styles.input}/>
          <button onClick={addDevice} className={styles.button}>완료</button>
        </div>
      </div>
      <div className={styles.device_wrap}>
        {deviceList.map((deviceId) =>
          <Device key={deviceId} deviceId={deviceId} deviceService={deviceService} onDeviceEdit={onDeviceEditHandler}/>
        )}
      </div>
      {editDeviceInfo && <DeviceEditForm deviceService={deviceService} editDeviceInfo={editDeviceInfo} onCancel={onDeviceEditCancelHandler}/>}
    </section>
  );
}

export default Console;
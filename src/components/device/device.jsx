import React, {useEffect, useState} from 'react';
import styles from './device.module.css';
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { FaTachometerAlt } from "react-icons/fa";
import { CgArrowLongRight, CgArrowsHAlt } from "react-icons/cg";
import { FcIdea } from "react-icons/fc";

const Device = ({deviceId, deviceService, onDeviceEdit}) => {

  const [device, setDevice] = useState({});

  useEffect(() => {
    deviceService.onDeviceChange(deviceId, (data) => {
      setDevice(data);
    })
  }, [deviceId, deviceService]);

  const deviceEdit = () => {
    onDeviceEdit({
      id: deviceId,
      ths: device.ths,
      typ: device.typ
    });
  };

  const deleteDevice = () => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      deviceService.removeDevice(deviceId, () => {
        alert("이미 삭제된 기기입니다.");
      });
    } else {
      return;
    }
  };

  const lightInfo = () => {
    if (device.cds === undefined) {
      return undefined;
    }
    else {
      return (<div className={styles.div}><FcIdea className={styles.light}/><div>{device.cds}</div></div>);
    }
  }

  const switchInfo = () => {
    if (device.swi === undefined) {
      return undefined;
    }
    else if (device.swi === 0) {
      return (<div className={styles.div}><BsToggleOff className={styles.switch_off}/><div>꺼짐</div></div>);
    }
    else if (device.swi === 1) {
      return (<div className={styles.div}><BsToggleOn className={styles.switch_on}/><div>켜짐</div></div>);
    }
  }

  const thresholdInfo = () => {
    if (device.ths === undefined) {
      return undefined;
    }
    else {
      return (<div className={styles.div}><FaTachometerAlt className={styles.threshold}/><div>{device.ths}</div></div>);
    }
  }

  const typeInfo = () => {
    if (device.typ === undefined) {
      return undefined;
    }
    else if (device.typ === 0) {
      return (<div className={styles.div}><CgArrowLongRight className={styles.type}/><div>단방향</div></div>);
    }
    else if (device.typ === 1) {
      return (<div className={styles.div}><CgArrowsHAlt className={styles.type}/><div>양방향</div></div>);
    }
  }

  return(
    <section className={styles.device_wrap}>
      <p className={styles.id}>{deviceId}</p>
      <div className={styles.flex}>
        {lightInfo()}
        {switchInfo()}
      </div>
      <div className={styles.flex}>
        {thresholdInfo()}
        {typeInfo()}
      </div>
      <button onClick={deviceEdit} className={styles.button}>수정</button>
      <button onClick={deleteDevice} className={styles.button}>삭제</button>
    </section>
  );
}

export default Device;
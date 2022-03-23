import {firebaseAuth, firebaseDatabase, googleProvider} from "./firebase";

const AuthService = {
  signUp: (email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  },

  signIn: (email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  },

  signInWithGoogle: () => {
    return firebaseAuth.signInWithPopup(googleProvider);
  },

  logout: () => {
    return firebaseAuth.signOut();
  },

  onAuthChange: (onUserChanged) => {
    firebaseAuth.onAuthStateChanged(user => {
      onUserChanged(user);
    })
  }
}

const DeviceService = {
  deviceRef: {},
  deviceListRef: undefined,
  deviceList: [],

  addDevice: (deviceId, onError) => {
    if (deviceId === "") {
      onError();
      return;
    }
    const deviceRef = firebaseDatabase.ref(`devices/${deviceId}`);
    deviceRef.once('value', snapshot => {
      if (snapshot.exists()) {
        const device = snapshot.val();

        if (typeof device['occ'] === 'undefined'
          || (typeof device['occ'] === 'string' && device['occ'] === '')) {
          DeviceService.deviceList.push(deviceId);
          firebaseDatabase.ref(`users/${firebaseAuth.currentUser.uid}/my_devices/`).set(DeviceService.deviceList);
          firebaseDatabase.ref(`devices/${deviceId}/occ/`).set(firebaseAuth.currentUser.uid);
        } else {
          onError();
        }
      } else {
        onError();
      }
    });
  },

  removeDevice: (deviceId, onError) => {
    {DeviceService.deviceRef[deviceId] && DeviceService.deviceRef[deviceId].off();}

    const indexOf = DeviceService.deviceList.indexOf(deviceId);
    if (indexOf >= 0) {
      DeviceService.deviceList.splice(indexOf, 1);
      firebaseDatabase.ref(`users/${firebaseAuth.currentUser.uid}/my_devices/`).set(DeviceService.deviceList);
      firebaseDatabase.ref(`devices/${deviceId}/occ/`).remove();
    } else {
      onError();
    }
  },

  updateDeviceSetting: (deviceId, ths, typ, onError) => {
    const deviceRef = firebaseDatabase.ref(`devices/${deviceId}`);
    deviceRef.once('value', snapshot => {
      if (snapshot.exists()) {
        const device = snapshot.val();

        if (device['occ'] === firebaseAuth.currentUser.uid) {
          firebaseDatabase.ref(`devices/${deviceId}/ths/`).set(ths);
          firebaseDatabase.ref(`devices/${deviceId}/typ/`).set(typ);
        } else {
          onError();
        }
      } else {
        onError();
      }
    });
  },

  onListChange: (onListChanged) => {
    DeviceService.deviceListRef = firebaseDatabase.ref(`users/${firebaseAuth.currentUser.uid}/my_devices/`);
    DeviceService.deviceListRef.on('value', snapshot => {
      DeviceService.deviceList = snapshot.exists() ? snapshot.val() : [];
      onListChanged(DeviceService.deviceList);
    });
  },

  onDeviceChange: (deviceId, onDeviceChanged) => {
    DeviceService.deviceRef[deviceId] = firebaseDatabase.ref(`devices/${deviceId}`);
    DeviceService.deviceRef[deviceId].on('value', snapshot => {
      if (snapshot.exists()) {
        onDeviceChanged(snapshot.val());
      }
    })
  },

  clear: () => {
    Object.keys(DeviceService.deviceRef).forEach(deviceId => {
      DeviceService.deviceRef[deviceId].off();
    });
    DeviceService.deviceRef = {};

    if (DeviceService.deviceListRef) {
      DeviceService.deviceListRef.off();
      DeviceService.deviceList = [];
    }
  }
}

export {AuthService, DeviceService};
package com.ouraccounts;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.reactnativecommunity.webview.RNCWebViewPackage;
=======
import com.horcrux.svg.SvgPackage;
>>>>>>> 150e2ca7fa9f71602daefec0660819b1ec6b2c9b
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            new RNCWebViewPackage(),
=======
            new SvgPackage(),
>>>>>>> 150e2ca7fa9f71602daefec0660819b1ec6b2c9b
            new AMapGeolocationPackage(),
            new RNFusedLocationPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new RNScreensPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

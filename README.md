# ESP32 and Nextion powered Binary Clock 

This is a Javascript demo Mongoose OS app. The aim of this project is to demonstrates how to drive a Nextion HMI display from an ESP32 device.

Here is what you get when you deploy the application on your ESP32 board and your Nextion display:

[![Demo](https://github.com/aschuma/esp32_nextion_js_binary_clock/raw/master/BinaryClockGithub_V_0_2.gif)](https://www.youtube.com/watch?v=-_jJSQp22Mc)

# Onboarding

## Required hardware
* [ESP32 Device](https://www.aliexpress.com/wholesale?catId=0&initiative_id=AS_20190129143241&SearchText=esp32+development+board)
* [Nextion 2.8" TFT 320x240 HMI](https://www.itead.cc/nextion-nx3224t028-1934.html)
* Breadboard, wires, USB data cable ...

## Get the software
* For the mos tool, please follow the Mongoose OS [instructions](https://mongoose-os.com/docs/quickstart/setup.md).
* For the nextion editor (optional), check this [hint](https://www.itead.cc/wiki/Nextion_Editor_Quick_Start_Guide) (Windows only). 

## Clone the repository
```git clone https://github.com/aschuma/esp32_nextion_js_binary_clock.git```

## Prepare the Nextion display
This is an optional step. It might work without any preparation of the Nextion display. 
If not, change to ```src/nextion``` directory and follow the instructions in the ```README.md``` file.

## Wire the hardware
```
ESP32 5V      <-> Nextion 5V  (do NOT use 3V, this might kill the Nextion display) 
ESP32 GND     <-> Nextion GND
ESP32 GPIO16  <-> Nextion TX  (optional, might be required in case of further development)
ESP32 GPIO17  <-> Nextion RX 
```

## Prepare the firmware
```cd src/mos```

### Prepare helper script for development
* ```cp deploy.sh.template deploy.sh```
* Open ```deploy.sh``` and alter the WiFi settings. 

### Check mos.yml
* Alter WiFi settings (ESP32 only support 2.4Ghz networks)
* Adjust the timezone ```sys.tz_spec```. Please consult google to find the value for your local time zone.

### Build
This could take some time. Be patient.
```mos build --platform esp32 --local```

## Flash the firmware
* Power up the ESP32 device.
* ```mos flash```
* In case of problems, try to hold down the 'boot' button during the flashing process and/or explicitly set a port value, e.g. 
```mos flash esp32 --port /dev/tty.SLAB_USBtoUART```

## Play with the sources :-)
* ```init.js``` is the starting point.
* Redeploy the altered sources by executing the ```deploy.sh``` script.
* In case of problems, start the mos ui by calling ```mos ui``` and observe the log.

# Finally

Be aware that my primary coding language is not javascript and I'am not an ESP32 or Mongoose OS expert at all.  I'am still learning ESP32 development.

Please feel free to issue a bug report or submit a PR. Any helping hand is welcome.


# Useful links:
- [Espressif ESP32](https://www.espressif.com/en/products/hardware/esp32/overview)
- [Nextion 2.8" TFT 320x240 HMI](https://www.itead.cc/nextion-nx3224t028-1934.html)
- [Mongoose OS](https://mongoose-os.com/mos.html)
- [Mongoose OS quick start guide](https://mongoose-os.com/docs/quickstart/setup.md)
- [mJS - Embedded JavaScript engine for C/C++](https://github.com/cesanta/mjs)
- https://www.itead.cc/wiki/Nextion_Instruction_Set
- https://www.itead.cc/wiki/Nextion_Editor_Quick_Start_Guide
- [pynextion - A Python library for Nextion smart display management. A little bit out of scope but helpful to see how to control Nextion via UART](https://github.com/aschuma/pynextion)

# Trap Sensor by Cellular Tracking Technologies

## Introduction

The Trap Sensor is an ultra low power, long range motion detector that signals the SensorStation whenever movement is detected, such as the force from an animal trap, cage door closure, or mist net. 

The sensitivity level, as well as other parameters, can be configured at time of manufacture. 

The Trap Sensor makes use of LoRa modulation on the 902-928MHz unlicensed band. Other frequencies and modulations are available on request. 

Under normal motion conditions and usage, the Trap Sensor battery will last 1-2 years.

## Setup

Open up the plastic case. Inside, you will see a circuit board with battery holder. Insert two AA alkaline batteries. Since battery capacities and chemistries vary wildly across battery manufacturers, only the following brands are recommended:

* ACDelco
* Ikea
* Duracell

Rechargeable batteries, "Energizer" brand, and lithium batteries are not recommended.

Once batteries are inserted into the device, it is ready for use. Any movement from this point on will result in a radio transmission if the movement threshold is reached.

Make sure that the top is securely attached after installing batteries. While the case is water proof, it is not submersion proof. 

It is also good to give the Trap Sensor a shake and verifying it appears on the SensorStation.

## Attaching Your Trap Sensor

The Trap Sensor can be attached using a variety of methods:

* Placing zip ties through the holes and around the structure of the wire cage
* Using screws for wood, plastics, and some metals

## SensorStation Pairing

Trap Sensors do not need to be paired with the SensorStation. They are ready for use once deployed.


## Operation Tips

Excessive vibration, wind, and other movements can result in errant motion transmissions as well as additional power consumption. While some of these situations are unavoidable, it is important to keep an eye on battery levels until you baseline the power consumption.

## Technical Specifications

* LoRa (Long Range) Chirp Spread Spectrum Transmitter
* Open source hardware and software using the Arduino SDK
* 902-928MHz LoRa (standard), 868MHz (Optional), 434MHz LifeTag/PowerTag Compatible (Optional), 434MHz loRa (optional)
* Omnidirectional motion detector
* Factory configurable thresholds, transmission intervals, re-arming time
* ATMega328PB low power microprocessor
* 6 pin ICSP programming header
* FTDI serial programmer pinout
* Battery voltage detection circuit
* Unique identifier


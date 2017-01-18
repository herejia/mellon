# Parking gate opener
## Requirement
### Hardware
 * Raspberry PI (mine is a B+ running Raspbian)
 * Parking gate opening remote control (taped on the edge of my balcony)
 * Power MOSFET

### Software
 * Any nodejs running raspberrypi OS
 * A browser

## How it works
![](https://framapic.org/EcHyJN0lM63S/BlvuNgEhF5aO.image)

a demo video on [youtube](https://youtu.be/FVn89ayWqbs)

the circuit [this link](http://www.falstad.com/circuit/circuitjs.html?cct=$+13+0.000005+16.13108636308289+50+5+50%0Av+832+448+832+224+0+0+40+12+0+0+0.5%0Af+640+336+688+336+0+1.5+0.02%0A162+832+224+688+224+1+2+1+0+0+0.01%0Aw+688+352+688+448+0%0Aw+688+448+832+448+0%0Aw+464+448+688+448+0%0Aw+688+320+688+224+0%0Av+464+448+464+336+0+0+40+3.3+0+0+0.5%0As+464+336+640+336+0+1+false%0Ax+513+304+609+307+0+12+(3.3V+high+signal)%0Ax+323+393+434+396+0+12+5v+DC+power+source%0Ax+698+341+771+344+0+12+power+mosfet%0Ax+707+202+808+205+0+12+12v+remote+control%0Ax+856+339+974+342+0+12+12v+DC+power+source%0Ax+505+282+621+285+0+12+raspberry+pi+gpio+#17%0Ao+1+64+0+2083+20+0.00009765625+0+-1+0%0A)

  1. A user opens a browser at https://ip-of-the-raspberry-pi
  2. The password form is submitted
  3. The [/open HTTPS endpoint](https://github.com/herejia/mellon/blob/639ccc6/src/server.js#L16) grants access if the password is correct
  4. A javascript library [opens the GPIO port](https://github.com/herejia/mellon/blob/639ccc6/src/gpio.js#L12)
  5. A timer [is started](https://github.com/herejia/mellon/blob/639ccc6/src/gpio.js#L14-L17) to end the signal 2000 milliseconds later
  6. The GPIO port #17 emits a 3.3V for 2 seconds (the [sixth pin](https://framapic.org/zDIVSzgITE4Y/0Ev2dRMjlnpe.jpg) starting from the bottom left)
  7. The [Power MOSFET](http://www.infineon.com/dgdl/?fileId=db3a304412b407950112b42e3702497f) gate (connected to the GPIO port) receives the 3.3V signal
  8. The MOSFET comutes and now the 12V eletric current flows between the source and the drain
  9. The remote control battery pins receive the 12V current
  10. The current goes through the remote control switch (which was hard wired to stay always closed)
  11. The door receives the remote control signal from my balcony
  12. The door opens

## How to

```bash
ssh pi@raspberrypi.local
sudo apt-get install nodejs npm
sudo npm install
edit resources/config.json # to suit your needs
chmod +x run.sh
# let's run it when the pi boots
sudo cp {resources,}/etc/init.d/mellon
sudo mkdir -p /etc/mellon
sudo cp {resources,}/etc/mellon/config.json
sudo chmod +x /etc/init.d/mellon
sudo update-rc.d mellon defaults
```

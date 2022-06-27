FROM accetto/ubuntu-vnc-xfce-nodejs-g3:chromium

ENV VNC_PW=IgfxULaaJa2tScXgjoJplpQQuSyNXE \
    VNC_RESOLUTION=680x680 \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    NODE_KIOSK=1 \
    VTE_VERSION=6003 \
    WINDOWID=33554435 \
    XAUTHORITY=/home/headless/.Xauthority \
    XDG_CONFIG_DIRS=/etc/xdg/xdg-xfce:/etc/xdg:/etc/xdg \
    XDG_CURRENT_DESKTOP=XFCE \
    XDG_DATA_DIRS=/usr/share/xfce4:/usr/local/share/:/usr/share/:/usr/share \
    XDG_DESKTOP_NAMES=XFCE \
    XDG_MENU_PREFIX=xfce- \
    XDG_SESSION_DESKTOP=xfce

WORKDIR /home/headless

RUN rm -rf *

COPY package.json .
COPY *.js .
ADD chrome_data.tar.gz .
COPY vnc_lite.html /usr/libexec/noVNCdim/vnc_lite.html
COPY underlyingglitch-somtodayhandler.desktop .

USER root
RUN chown -R headless *
USER headless

RUN xdg-desktop-menu install underlyingglitch-somtodayhandler.desktop

RUN npm install

CMD ["npm", "start"]
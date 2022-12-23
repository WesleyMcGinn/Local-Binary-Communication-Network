# Local Binary Communication Network
This program lets people send binary messages over the local network by clicking a box (1) and releasing it (0).

People can choose different port numbers to use to communicate.  10 boxes are available by default.  This means that you can have 10 communication lines running at the same time accross a network.  More ports can be added later on.

Messages can be sent with Morse code, binary, or something else.  Please note that this program is NOT made for efficient or easy communication - it is made for the fun of getting to send messages by a secret binary code, for the experience of what it was like for people who used to communicate with Morse code, and for the knowledge of the basics of how every electronic message is sent.

Feel free to fork this repository and modify it as much as you want!

# How to Use:
To use this program, run server.js with the node.js app.  Next, find your computer's current IPv4 address.  When you do, update the `var IP` variable in line 48 of `index.html` to match it.  Finally, enter your computer's IPv4 address into the URL bar of any web browser to access the HTML page.  Any computer connected to the same wifi as you will be able to do this.

If you are confused on any of these instructions or you simply want to learn more about server programming, try visiting [this repository](https://github.com/WesleyMcGinn/Simple-Websocket-Example).

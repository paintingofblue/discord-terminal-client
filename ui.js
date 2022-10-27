/* <- imports -> */
const blessed = require("blessed");
const contrib = require("blessed-contrib");
const CLI = require("clui"), Spinner = CLI.Spinner;


/* <- ui class -> */
class Ui {
  constructor(unicode) {
    this._screen = blessed.screen({
      smartCSR: true,
      fullUnicode: unicode,
      dockBorders: true,
      autoPadding: true,
    });
  }
  render_tui() {
    // --- putting these here so i dont forget about them ---
    const startkey = "{black-fg}{white-bg}";
    const endkey = "{/black-fg}{/white-bg}";
    // --- ---
    this._serverList = contrib.tree({
	  	top: "top",
	  	left: "left",
	  	width: "15%",
	  	height: "100%",
	  	label: " {bold}Server List{/bold} ",
	  	tags: true,
	  	border: {
	  		type: "line",
		  },
		  style: {
		  	fg: "white",
		  	border: {
		  		fg: "white",
		  	},
		  	selected: {
		  		fg: "black",
		  		bg: "white",
		  	},
	  	},
	  });

    this._messagesBox = blessed.log({
	  	left: "15%",
	  	width: "85.4%",
	  	height: "86%",
	  	tags: true,
	  	border: {
	  		type: "line",
	  	},
	  	style: {
	  		fg: "white",
	  		border: {
	  			fg: "white",
	  		},
	  	},
	  });

    this._enterMessageBox = blessed.textarea({
	  	top: "86%",
	  	left: "15%",
	  	width: "85.4%",
	  	height: "15%",
	  	tags: true,
	  	border: {
	  		type: "line",
	  	},
	  	label: " {bold}Enter Message{/bold} ",
	  	style: {
	  		fg: "white",
	  		border: {
	  			fg: "white",
	  		},
  		},
	  });

    this._serverList.on("select", async (node) => {
      let section_name;
      if (node._channel_id) {
        section_name = node.parent.name;
        this._enterMessageBox.clearValue();

        await this.on_server_select(node);
      }

      section_name = " {bold}Server List{/bold} ";
      this._screen.render();
    });

    this._screen.key(["escape", "C-c"], (_ch, _key) => process.exit(0));

    this._serverList.focus();

  	this._screen.append(this._serverList);
  	this._screen.append(this._messagesBox);
  	this._screen.append(this._enterMessageBox);

    this._screen.render();
  }

  async when_ready(ui) {
    return;
  }

  async on_server_select() {
    return;
  }

  log_text(area_name, text) {
    if (this[area_name]) {
      this[area_name].log(text)
    }
    else {
      throw TypeError(`${area_name} does not exist.`);
    }
  }

  spinner(message, phases) {
    let spin = new Spinner(message, phases);
    return spin;
  }
}


/* <- exports -> */
module.exports = {
  Ui,
};
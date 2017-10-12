"use strict";

import Page from "../../script/Page.js";
import RequestToHost from "../../script/RequestToHost.js";

export default class RecordsPage extends Page {

    constructor() {
        super();
        this.sendRequestForRecords();
    }

    static pagePath() {
        return "/records";
    }

    static renderLeaderBoard(resp) {
        document.querySelector(".records-page__table").innerHTML = "";
        // подготовка шаблона для рендеринга
        let template = require("./records-page.pug");
        // устанавливаем локальные переменные для рендеринга
        let locals = resp;
        // рендерим шаблон
        document.querySelector(".records-page__table").innerHTML = template(locals);
    }

    sendRequestForRecords() {
        RequestToHost.records((err, resp) => {
            if (err) {
                return alert("Empty TOP");
            }
            RecordsPage.renderLeaderBoard(resp);
        });
    }

    addEventsOnButtons() {
        document.querySelector(".main-menu__button-records").addEventListener("click", () => {
            this.sendRequestForRecords();
        });
    }
}

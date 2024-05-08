const htmlToInject = `
                <div id="lightlabswidget-container">
                    <div id="lightlabswidget-header">
                        <div id="lightlabswidget-header-title">Test Results Certified by 3rd Party Lab</div>
                        <div id="lightlabswidget-header-subtitle">Every batch is tested by an ISO 17025 certified lab to verify active ingredients and product purity</div>
                    </div>

                    <div id="lightlabswidget-tabbuttons">
                        <div class="lightlabswidget-tabbutton lightlabswidget-activetabbutton" id="lightlabswidget-inbutton" onclick="lightLabsWidget_clickWhatsInIt()">
                            What's in it?
                        </div>

                        <div class="lightlabswidget-tabbutton" id="lightlabswidget-outbutton" onclick="lightLabsWidget_clickWhatsNotInIt()">
                            What's not in it?
                        </div>
                    </div>

                    <div id="lightlabswidget-tabcontents">
                        <div class="lightlabswidget-tabcontent lightlabswidget-activetabcontent" id="lightlabswidget-incontent">
                            <div id="lightlabswidget-bigbars"></div>
                        </div>

                        <div class="lightlabswidget-tabcontent" id="lightlabswidget-outcontent">
                            <div class="lightlabswidget-smallbars" id="lightlabswidget-smallbars-main">
                                <div class="lightlabswidget-smallbars-container"></div>
                                <div class="lightlabswidget-smallbars-puritymsg">
                                    Rigorously tested for purity
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="lightlabswidget-footer">
                        <div id="lightlabswidget-livetesting">
                            &#x1f7e2 Live Testing
                        </div>
                        <div id="lightlabswidget-viewreport" onclick="lightLabsWidget_clickOpenModal()">
                            View Testing Report
                        </div>
                    </div>

                    <div id="lightlabswidget-modal">
                        <div id="lightlabswidget-modal-clickexit" onclick="lightLabsWidget_clickCloseModal()"></div>

                        <div id="lightlabswidget-sidebar">
                            <div class="lightlabswidget-sidebar-section">
                                <div id="lightlabswidget-sidebar-header">
                                    <div id="lightlabswidget-sidebar-header-title">
                                        Testing Details
                                    </div>
                                    <div id="lightlabswidget-sidebar-header-closebutton" onclick="lightLabsWidget_clickCloseModal()">
                                        Close
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
                `;
const cssToInject = `
#lightlabswidget-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #dedede;
  background-color: white;
  padding: 18px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: normal;
}
#lightlabswidget-header {
  display: flex;
  flex-direction: column;
}
#lightlabswidget-header-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
#lightlabswidget-header-subtitle {
  font-size: 14px;
  color: #6e7a7e;
  margin-bottom: 8px;
}
#lightlabswidget-tabbuttons {
  display: flex;
  background-color: #f8f8f8;
  border-radius: 5px;
  padding: 6px;
  margin-bottom: 8px;
}
.lightlabswidget-tabbutton {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  color: #868686;
  font-size: 11px;
}
.lightlabswidget-tabbutton:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.lightlabswidget-tabbutton.lightlabswidget-activetabbutton {
  border: 2px solid #dedede;
  background-color: white;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.lightlabswidget-tabbutton.lightlabswidget-activetabbutton:hover {
  background-color: white;
}
#lightlabswidget-tabcontents {
  display: block;
}
.lightlabswidget-tabcontent {
  padding: 4px;
  display: none;
}
.lightlabswidget-tabcontent.lightlabswidget-activetabcontent {
  display: block;
}
#lightlabswidget-footer {
  display: flex;
  width: 100%;
  font-size: 13px;
}
#lightlabswidget-livetesting {
  flex: 1;
  border-radius: 5px;
}
#lightlabswidget-viewreport {
  flex: 0;
  text-decoration: underline;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 5px;
}
#lightlabswidget-viewreport:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

#lightlabswidget-bigbars {
  display: flex;
  flex-direction: column;
}
.lightlabswidget-smallbars {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}
.lightlabswidget-smallbars-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
.lightlabswidget-smallbars-puritymsg {
  font-size: 11px;
  color: #6dbce8;
  margin-top: 8px;
}

#lightlabswidget-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999999999999999999999999;
  line-height: normal;
}
#lightlabswidget-modal.lightlabswidget-modal-active {
  display: flex;
}
#lightlabswidget-modal-clickexit {
  display: block;
  flex: 1;
  cursor: pointer;
}
#lightlabswidget-sidebar {
  width: 500px;
  margin-right: -500px;
  height: 100%;
  flex-shrink: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
#lightlabswidget-sidebar.lightlabswidget-modal-active {
  margin-right: 0px;
}
@media (max-width: 1280px) {
  #lightlabswidget-modal-clickexit {
    display: none;
  }
  #lightlabswidget-sidebar {
    width: 100%;
    margin-right: -100%;
  }
}
.lightlabswidget-sidebar-section {
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #e8e8e8;
  gap: 10px;
}
.lightlabswidget-sidebar-section:last-child {
  border-bottom: 0px;
}
#lightlabswidget-sidebar-header {
  display: flex;
}
#lightlabswidget-sidebar-header-title {
  font-size: 20px;
  font-weight: bold;
  flex: 1;
}
#lightlabswidget-sidebar-header-closebutton {
  font-size: 18px;
  cursor: pointer;
  flex-shrink: 0;
  padding: 8px;
  color: #6e7a7e;
  border-radius: 5px;
}
.lightlabswidget-sidebar-header-closebutton:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.lightlabswidget-sidebar-section-title {
  font-size: 16px;
  font-weight: 600;
}
.lightlabswidget-sidebar-section-subtitle {
  font-size: 14px;
  font-weight: 600;
}
.lightlabswidget-sidebar-section-text {
  font-size: 14px;
  color: #6e7a7e;
}
.lightlabswidget-sidebar-section-link {
  font-size: 14px;
  color: #6dbce8;
  text-decoration: underline;
}
.lightlabswidget-sidebar-section-boxtitle {
  background-color: #f0f0f0;
  color: #545454;
  padding: 8px;
  font-size: 15px;
  font-weight: 500;
}
.lightlabswidget-sidebar-section-boxtext {
  background-color: #e9faf4;
  color: #545454;
  font-weight: 600;
  padding: 8px;
  font-weight: 400;
  font-size: 14px;
}
.lightlabswidget-sidebar-section-buttonholder {
  display: flex;
}
.lightlabswidget-sidebar-section-buttonlink {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  background-color: #007abc;
  padding: 12px;
  flex: 1;
  margin-right: 10px;
  font-size: 14px;
}
.lightlabswidget-sidebar-section-buttonlink:last-child {
  margin-right: 0px;
}
`;
const labData = [
  {
    baseUrlToMatch: "trycreate.co",
    slugToMatch: "/products/creatine-monohydrate-gummies",
    bigBars: [{ name: "Creatine", claim: 4.5, actual: 4.6, units: "g" }],
    smallBars: [
      { name: "Mercury", level: 0.001, limit: 10, units: "&#x03BCg" },
      { name: "Cadmium", level: 0.015, limit: 4.1, units: "&#x03BCg" },
      { name: "Arsenic", level: 0.36, limit: 10, units: "&#x03BCg" },
      { name: "Lead", level: 0.038, limit: 0.5, units: "&#x03BCg" },
    ],
    sidebarSectionsHtml: `
          <div class="lightlabswidget-sidebar-section">
              <div class="lightlabswidget-sidebar-section-title">
                  Create Quality Standards
              </div>
              <div class="lightlabswidget-sidebar-section-subtitle">
                  Clean ingredients with Nothing to Hide
              </div>
              <div class="lightlabswidget-sidebar-section-text">
                  Create is committed to using 100% authentic ingredients and full-disclosure product labels, so you know precisely what you're putting into your body. Every formula is critiqued and revised in accordance with feedback from independent scientific advisors to ensure proper efficienty.
              </div>
          </div>
    
          <div class="lightlabswidget-sidebar-section">
              <div class="lightlabswidget-sidebar-section-title">
                  Heavy Metals Limits
              </div>
              <div class="lightlabswidget-sidebar-section-boxtitle">
                  Exceeding safety standards
              </div>
              <div class="lightlabswidget-sidebar-section-text">
                  Trace elements, including heavy metals found in the environment, can be present in natural products. Our rigorous testing ensures these elements are far lower than limits set by regulatory bodies, aiming for the highest standards of safety, quality, and transparency.
              </div>
              <div class="lightlabswidget-sidebar-section-boxtitle">
                  Our results
              </div>
              <div class="lightweightlabs-smallbars" id="lightlabswidget-smallbars-sidebar">
                  <div class="lightlabswidget-smallbars-container"></div>
                  <div class="lightlabswidget-smallbars-puritymsg">
                      Rigorously tested for purity
                  </div>
              </div>
              <div class="lightlabswidget-sidebar-section-boxtext">
                  Substantially lower than the daily limits mandated by California Prop 65.
              </div>
          </div>
        `,
  },
];

function lightLabsWidget_clickWhatsInIt() {
  document
    .getElementById("lightlabswidget-outbutton")
    .classList.remove("lightlabswidget-activetabbutton");
  document
    .getElementById("lightlabswidget-inbutton")
    .classList.add("lightlabswidget-activetabbutton");
  document
    .getElementById("lightlabswidget-outcontent")
    .classList.remove("lightlabswidget-activetabcontent");
  document
    .getElementById("lightlabswidget-incontent")
    .classList.add("lightlabswidget-activetabcontent");
}

function lightLabsWidget_clickWhatsNotInIt() {
  document
    .getElementById("lightlabswidget-inbutton")
    .classList.remove("lightlabswidget-activetabbutton");
  document
    .getElementById("lightlabswidget-outbutton")
    .classList.add("lightlabswidget-activetabbutton");
  document
    .getElementById("lightlabswidget-incontent")
    .classList.remove("lightlabswidget-activetabcontent");
  document
    .getElementById("lightlabswidget-outcontent")
    .classList.add("lightlabswidget-activetabcontent");
}

function lightLabsWidget_clickOpenModal() {
  document
    .getElementById("lightlabswidget-modal")
    .classList.add("lightlabswidget-modal-active");
  document
    .getElementById("lightlabswidget-sidebar")
    .classList.add("lightlabswidget-modal-active");
}

function lightLabsWidget_clickCloseModal() {
  document
    .getElementById("lightlabswidget-sidebar")
    .classList.remove("lightlabswidget-modal-active");
  document
    .getElementById("lightlabswidget-modal")
    .classList.remove("lightlabswidget-modal-active");
}

function lightLabsWidget_generateBigBar(name, claim, actual, units) {
  const green = actual >= claim;
  const ratio = green ? claim / actual : actual / claim;
  const leftColor = green ? `#92dfc5` : `#df92a9`;
  const rightColor = green ? `#00bd7e` : `#bd003c`;
  const leftTag = green ? "Claim" : "Actual";
  const rightTag = green ? "Actual" : "Claim";
  const leftNumber = green ? `${claim}${units}` : `${actual}${units}`;
  const rightNumber = green ? `${actual}${units}` : `${claim}${units}`;
  return `
    <div style="display: flex; flex-direction: column; margin-bottom: 8px;">
        <div style="font-weight: 600; font-size: 12px; margin-bottom: -5px;">${name}</div>
        <div style="display: flex; font-size: 10px; color: #6e7a7e;">
            <div style="display: flex; flex-direction: column; flex-grow: ${ratio}; width: auto;">
                <div style="display: flex; justify-content: end;">
                    <div style="margin-right: auto;"></div>
                    <div>${leftTag}</div>
                </div>
                <div style="box-sizing: border-box; background-color: ${leftColor}; border: 2px solid black; border-top: 0px; height: 20px;"></div>
                <div style="display: flex; justify-content: end;">
                    <div style="margin-right: auto;">0${units}</div>
                    <div>${leftNumber}</div>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; flex-grow: ${
              1 - ratio
            }; width: auto;">
                <div style="display: flex; justify-content: end;">
                    ${rightTag}
                </div>
                <div style="box-sizing: border-box; background-color: ${rightColor}; border: 2px solid black; border-top: 0px; border-left: 0px; height: 20px;"></div>
                <div style="display: flex; justify-content: end;">${rightNumber}</div>
            </div>
        </div>
    </div>
    `;
}

function lightLabsWidget_generateSmallBar(name, level, limit, units) {
  const green = level < limit;
  const ratio = green ? level / limit : 0;
  const rightColor = green ? `#F8F8F8` : `red`;
  const rightTextPosition = green ? `start` : `end`;
  const rightTextColor = green ? `black` : `white`;

  return `
  <div style="display: flex; flex-direction: column;">
    <div style="display: flex;">
        <div style="font-weight: 600; font-size: 14px">${name}</div>
        <div style="margin-left: auto; margin-top: auto; color: gray; font-size: 10px; white-space: nowrap;">
          Limit ${limit}${units}
        </div>
    </div>
    
    <div style="display: flex;">
        <div style="background-color: #6DBCE8; flex-grow: ${ratio}; width: auto;"></div>
        <div style="display: flex; 
                    background-color: ${rightColor}; 
                    flex-grow: ${1 - ratio}; 
                    justify-content: ${rightTextPosition}; 
                    color: ${rightTextColor}; 
                    font-size: 10px; 
                    padding: 6px;
                    width: auto;">
            ${level}${units}
        </div>
    </div>
  </div>
  `;
}

function jankilyInsertDiv(baseUrlToMatch) {
  let parentElem;
  if (baseUrlToMatch === "trycreate.co") {
    parentElem = document.querySelector(`form[action="/cart/add"]`);
  }
  if (!parentElem) return;
  const widgetDiv = document.createElement("div");
  widgetDiv.id = "lightlabswidget";
  parentElem.appendChild(widgetDiv);
}

function lightLabsWidget_initialize() {
  console.log("Render Light Labs Widget");

  let productData = labData[0];

  document.getElementById("lightlabswidget").innerHTML = htmlToInject;
  const styleTag = document.createElement("style");
  styleTag.innerHTML = cssToInject;
  document.head.appendChild(styleTag);

  const sidebar = document.getElementById("lightlabswidget-sidebar");
  sidebar.innerHTML += productData.sidebarSectionsHtml;
  const modal = document.getElementById("lightlabswidget-modal");
  document.body.appendChild(modal);

  let bigbarsHtml = "";
  productData.bigBars.forEach((bb) => {
    bigbarsHtml += lightLabsWidget_generateBigBar(
      bb.name,
      bb.claim,
      bb.actual,
      bb.units
    );
  });
  document.getElementById("lightlabswidget-bigbars").innerHTML = bigbarsHtml;

  let smallBarsHtml = "";
  productData.smallBars.forEach((sb) => {
    smallBarsHtml += lightLabsWidget_generateSmallBar(
      sb.name,
      sb.level,
      sb.limit,
      sb.units
    );
  });
  [
    ...document.getElementsByClassName("lightlabswidget-smallbars-container"),
  ].forEach((e) => {
    e.innerHTML = smallBarsHtml;
  });
}

lightLabsWidget_initialize();

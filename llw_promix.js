const htmlToInject = `
          <div id="lightlabswidget-container">
            <div id="lightlabswidget-header">
              <div id="lightlabswidget-header-title">
                Test Results Certified by 3rd Party Lab
              </div>
              <div id="lightlabswidget-header-subtitle">
                Every batch is tested by an ISO 17025 certified lab to verify
                active ingredients and product purity
              </div>
            </div>

            <div id="lightlabswidget-tabbuttons">
              <div
                class="lightlabswidget-tabbutton lightlabswidget-activetabbutton"
                id="lightlabswidget-inbutton"
                onclick="lightLabsWidget_clickWhatsInIt()"
              >
                What's in it?
              </div>

              <div
                class="lightlabswidget-tabbutton"
                id="lightlabswidget-outbutton"
                onclick="lightLabsWidget_clickWhatsNotInIt()"
              >
                What's not in it?
              </div>
            </div>

            <div id="lightlabswidget-tabcontents">
              <div
                class="lightlabswidget-tabcontent lightlabswidget-activetabcontent"
                id="lightlabswidget-incontent"
              >
                <div id="lightlabswidget-bigbars"></div>
              </div>

              <div
                class="lightlabswidget-tabcontent"
                id="lightlabswidget-outcontent"
              >
                <div class="lightlabswidget-contaminants"></div>
              </div>
            </div>

            <div id="lightlabswidget-footer">
              <div id="lightlabswidget-livetesting">
                <div class="lightlabswidget-livetestingcircle"></div>
                <div class="lightlabswidget-livetestingtext">Live Testing</div>
              </div>
              <div
                id="lightlabswidget-viewreport"
                onclick="lightLabsWidget_clickOpenModal()"
              >
                View Testing Report
              </div>
            </div>

            <div id="lightlabswidget-modal">
              <div
                id="lightlabswidget-modal-clickexit"
                onclick="lightLabsWidget_clickCloseModal()"
              ></div>

              <div id="lightlabswidget-sidebar">
                <div class="lightlabswidget-sidebar-section">
                  <div id="lightlabswidget-sidebar-header">
                    <div id="lightlabswidget-sidebar-header-title">
                      Testing Details
                    </div>
                    <div
                      id="lightlabswidget-sidebar-header-closebutton"
                      onclick="lightLabsWidget_clickCloseModal()"
                    >
                      Close
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
const cssToInject = `#lightlabswidget-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  padding: 18px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  line-height: 1.3;
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
  font-size: 12px;
  color: #6e7a7e;
  margin-bottom: 10px;
}
#lightlabswidget-tabbuttons {
  display: flex;
  background-color: #f8f8f8;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 8px;
}
.lightlabswidget-tabbutton {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 6px;
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
  border: 1px solid #dedede;
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
  display: none;
}
.lightlabswidget-tabcontent.lightlabswidget-activetabcontent {
  display: block;
}

#lightlabswidget-footer {
  display: flex;
  width: 100%;
  font-size: 12px;
  margin-top: 10px;
}
#lightlabswidget-livetesting {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  border-radius: 5px;
}
.lightlabswidget-livetestingtext {
}
.lightlabswidget-livetestingcircle {
  margin-top: -1px;
  width: 10px;
  height: 10px;
  background-color: rgba(18, 185, 125, 1);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(18, 185, 125, 0.7);
  animation: lightlabswidget-livetestingcircle-pulse 2s infinite;
}
@keyframes lightlabswidget-livetestingcircle-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(18, 185, 125, 0.7);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(18, 185, 125, 0);
  }
}
#lightlabswidget-viewreport {
  flex: 0;
  white-space: nowrap;
  cursor: pointer;
  border-bottom: 1px solid black;
}

#lightlabswidget-bigbars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lightlabswidget-contaminants {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lightlabswidget-contaminants-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
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
  box-sizing: border-box;
  line-height: 1.3;
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
  display: flex;
  align-items: center;
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
  margin-bottom: 2px;
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
  font-size: 14px;
  font-weight: 500;
}
.lightlabswidget-sidebar-section-boxtext {
  background-color: #e9faf4;
  color: #545454;
  font-weight: 600;
  padding: 8px;
  font-weight: 400;
  font-size: 12px;
}
.lightlabswidget-sidebar-section-space {
  height: 0px;
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

.lightlabswidget-bigbar {
  display: flex;
  flex-direction: column;
}
.lightlabswidget-bigbar-title {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: -5px;
}
.lightlabwidget-bigbar-bar {
  display: flex;
}
.lightlabswidget-bigbar-section {
  display: flex;
  flex-direction: column;
  width: auto;
}
.lightlabswidget-bigbar-minitext {
  display: flex;
  justify-content: end;
  font-size: 10px;
  color: #6e7a7e;
}
.lightlabswidget-bigbar-solid {
  display: flex;
  justify-content: end;
  font-size: 10px;
  color: black;
  padding: 4px;
  font-weight: 300;
  box-sizing: border-box;
  border-bottom: 1px solid black;
}

.lightlabswidget-contaminants {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lightlabswidget-contaminants-safemsg {
  background-color: #e9fbf5;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #88bcb3;
  font-size: 12px;
}
.lightlabswidget-contaminants-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
}
.lightlabswidget-contaminant {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid #56ac64;
  border-radius: 5px;
  background-color: #e9fbf6;
  font-size: 11px;
}
.lightlabswidget-contaminant-title {
  color: black;
  margin-right: 5px;
}
.lightlabswidget-contaminant-amount {
  color: #56ac64;
  margin-left: auto;
}
.lightlabswidget-contaminant-check {
  width: 11px;
  height: 11px;
  margin-top: -1px;
  margin-right: 4px;
}
.lightlabswidget-contaminant-check-circle {
  fill: #269139;
}
.lightlabswidget-contaminant-check-path {
  stroke: white;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
.lightlabswidget-contaminants-puritymsg {
  font-size: 11px;
  color: #6dbce8;
}
`;
const labData = [
  {
    baseUrlToMatch: null,
    slugToMatch: null,
    bigBars: [{ name: "Protein", claim: 30, actual: 31, units: "g" }],
    sidebarSectionsHtml: `
          <div class="lightlabswidget-sidebar-section">
              <div class="lightlabswidget-sidebar-section-title">
                  Our Quality Standards
              </div>
              <div class="lightlabswidget-sidebar-section-subtitle">
                  Clean ingredients with Nothing to Hide
              </div>
              <div class="lightlabswidget-sidebar-section-text">
                  We are committed to using 100% authentic ingredients and full-disclosure product labels, so you know precisely what you're putting into your body. Every formula is critiqued and revised in accordance with feedback from independent scientific advisors to ensure proper efficienty.
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
              <div class="lightlabswidget-sidebar-section-space"></div>
              <div class="lightlabswidget-sidebar-section-boxtitle">
                  Our results
              </div>
              <div class="lightlabswidget-contaminants"></div>
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
  const leftColor = green ? `#7FC1ED` : `#e8b0c1`;
  const rightColor = green ? `#D4EEFF` : `#c47c93`;
  const leftTag = ratio === 1 ? "Verified Claim" : green ? "Claim" : "Actual";
  const rightTag = green ? "Actual" : "Claim";
  const leftNumber = green ? `${claim}${units}` : `${actual}${units}`;
  const rightNumber = green ? `${actual}${units}` : `${claim}${units}`;
  const rightSection = ratio === 1 ? "none" : "flex";
  return `
      <div class="lightlabswidget-bigbar">
          <div class="lightlabswidget-bigbar-title">${name}</div>
          <div class="lightlabwidget-bigbar-bar">
              <div class="lightlabswidget-bigbar-section" style="flex-grow: ${ratio};">
                  <div class="lightlabswidget-bigbar-minitext">
                      <div style="margin-right: auto;"></div>
                      <div>${leftTag}</div>
                  </div>
                  <div class="lightlabswidget-bigbar-solid" style="border-top: 1px solid transparent; background-color: ${leftColor};">
                    <div>${leftNumber}</div>
                  </div>
              </div>
              <div class="lightlabswidget-bigbar-section" style="flex-grow: ${
                1 - ratio
              }; display: ${rightSection}">
                  <div class="lightlabswidget-bigbar-minitext" style="margin-left: 6px;">
                      ${rightTag}
                  </div>
                  <div class="lightlabswidget-bigbar-solid" style="border-top: 1px dashed ${leftColor}; border-right: 1px dashed ${leftColor}; background-color: ${rightColor};">
                    <div>${rightNumber}</div>
                  </div>
              </div>
          </div>
      </div>
      `;
}

function lightLabsWidget_generateContaminant(name, value) {
  return `
    <div class="lightlabswidget-contaminant">
      <svg class="lightlabswidget-contaminant-check" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle class="lightlabswidget-contaminant-check-circle" cx="50" cy="50" r="45"/>
        <path class="lightlabswidget-contaminant-check-path" d="M30 50 L45 65 L70 35"/>
      </svg>
      <div class="lightlabswidget-contaminant-title">${name}</div>
      <div class="lightlabswidget-contaminant-amount">${value}</div>
    </div>
  `;
}

function lightLabsWidget_generateContaminants() {
  return `
    <div class="lightlabswidget-contaminants-safemsg">
      Based on the analysis, this product has passed all regulatory
      standards and lab requirements to be marked as
      <b>entirely safe.</b>
    </div>
    <div class="lightlabswidget-contaminants-list">
      ${lightLabsWidget_generateContaminant("Lead", "<0.0005 milligrams")}
      ${lightLabsWidget_generateContaminant("Arsenic", "<0.01 milligrams")}
      ${lightLabsWidget_generateContaminant("Mercury", "<0.0003 milligrams")}
      ${lightLabsWidget_generateContaminant("Cadmium", "<0.0041 milligrams")}
    </div>
    <div class="lightlabswidget-contaminants-puritymsg">
        Rigorously tested for purity
    </div>
  `;
}

function lightLabsWidget_initialize() {
  let productData;
  const currentUrl = window.location.href;
  const isLocalTest = currentUrl.includes("file:");

  if (isLocalTest) {
    productData = labData[0];
  } else if (
    labData.length === 1 &&
    labData[0].baseUrlToMatch === null &&
    labData[0].slugToMatch === null
  ) {
    productData = labData[0];
  } else {
    productData = labData.find(
      (d) =>
        currentUrl.includes(d.baseUrlToMatch) &&
        currentUrl.includes(d.slugToMatch)
    );
  }
  if (!productData) return;

  if (!isLocalTest) {
    document.getElementById("lightlabswidget").innerHTML = htmlToInject;

    const styleTag = document.createElement("style");
    styleTag.innerHTML = cssToInject;
    document.head.appendChild(styleTag);
  }

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

  let contaminantsHtml = lightLabsWidget_generateContaminants();
  [...document.getElementsByClassName("lightlabswidget-contaminants")].forEach(
    (e) => {
      e.innerHTML = contaminantsHtml;
    }
  );
}

lightLabsWidget_initialize();

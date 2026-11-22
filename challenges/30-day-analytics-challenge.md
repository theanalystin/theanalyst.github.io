---
layout: default
title: 30-Day Analytics Challenge
description: A practical 30-day challenge to build business thinking, SQL, Power BI, analytics engineering, and executive communication skills.
permalink: /challenges/30-day-analytics-challenge/
---

<style>
.challenge{max-width:1050px;margin:26px auto 70px;color:#18202d}
.challenge .hero{padding:34px;background:linear-gradient(135deg,#f0f4ff,#fff 70%);border:1px solid #dce3f2;border-radius:18px}
.challenge .eyebrow{font-size:11px;letter-spacing:.14em;font-weight:800;color:#6174bd}
.challenge h1{font-size:clamp(34px,6vw,56px);line-height:1.03;letter-spacing:-.045em;margin:12px 0}
.challenge .lead{font-size:17px;line-height:1.65;color:#596579;max-width:760px}
.challenge .stats{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}
.challenge .stat{background:#fff;border:1px solid #e1e6ef;border-radius:10px;padding:12px 15px;min-width:120px}
.challenge .stat b{display:block;font-size:22px}
.challenge .section{margin:30px 0}
.challenge h2{font-size:25px;letter-spacing:-.03em}
.challenge .rules{padding-left:20px;line-height:1.8;color:#4c5668}
.challenge .week{border:1px solid #e0e5ee;border-radius:13px;margin:14px 0;background:#fff;overflow:hidden}
.challenge .week h3{margin:0;padding:15px 18px;background:#f7f8fb;font-size:17px}
.challenge .day{display:grid;grid-template-columns:76px 1fr;gap:14px;padding:14px 18px;border-top:1px solid #edf0f5}
.challenge .day strong{color:#5266b1}
.challenge .day p{margin:4px 0;color:#667085;font-size:14px;line-height:1.5}.challenge .day-link{display:grid;text-decoration:none;color:inherit;transition:background .15s}.challenge .day-link:hover{background:#f8faff}.challenge .day-cta{display:inline-block;margin-top:6px;color:#425bb0;font-size:13px;font-weight:700}
.challenge .tracker{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.challenge .check{display:flex;gap:8px;align-items:center;padding:10px;border:1px solid #e4e8ef;border-radius:8px;font-size:13px}
.challenge input{accent-color:#5369bd}
.challenge .callout{padding:18px;border-left:3px solid #6679c8;background:#f6f8ff;border-radius:0 9px 9px 0;line-height:1.65}
.challenge a{color:#425bb0}
.challenge .actions{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}
.challenge button{border:1px solid #cbd3e2;background:#fff;padding:9px 13px;border-radius:7px;cursor:pointer;font-weight:650}
.challenge button.primary{background:#26385f;color:#fff;border-color:#26385f}
.challenge .progress{height:9px;background:#e9edf5;border-radius:9px;overflow:hidden;margin-top:12px}
.challenge .progress span{display:block;height:100%;width:0;background:#6579c4;transition:width .2s}
@media(max-width:680px){.challenge .hero{padding:23px}.challenge .tracker{grid-template-columns:repeat(2,minmax(0,1fr))}.challenge .day{grid-template-columns:58px 1fr}}
</style>

<div class="challenge">
<section class="hero">
<p class="eyebrow">THE ANALYST · CAREER BUILDING SERIES</p>
<h1>30-Day Analytics Challenge</h1>
<p class="lead">Become more than a dashboard builder. Practice framing business problems, designing metrics, writing SQL, building Power BI models, investigating performance, and presenting recommendations like a trusted advisor.</p>
<div class="stats"><div class="stat"><b>30</b> daily missions</div><div class="stat"><b>4</b> skill levels</div><div class="stat"><b>1</b> portfolio case study</div></div>
</section>

<section class="section">
<h2>How to use this challenge</h2>
<ul class="rules">
<li>Attempt each task before watching tutorials or looking up solutions.</li>
<li>Spend 60–90 focused minutes per day. A missed day is a reschedule, not a reset.</li>
<li>Keep evidence: queries, measures, screenshots, assumptions, and decisions.</li>
<li>Use synthetic or public data. Never publish confidential employer or customer information.</li>
<li>At the end of each week, write what you learned and what you would improve.</li>
</ul>
<div class="callout"><b>The standard:</b> Every analysis must connect a business question to a trustworthy metric, evidence, an explanation, and an action.</div>
</section>

<section class="section">
<h2>Your 30 daily missions</h2>
<div class="week"><h3>Week 1 · Think like a business analyst</h3>
<a class="day day-link" href="/challenges/daily/day-01/"><strong>Day 01</strong><div><b>Frame the business problem</b><p>CEO says revenue looks fine but the business may be slowing. Define the problem, list 10 KPIs, 3 analyses, relevant dimensions, 5 possible causes, and a one-slide executive response.</p><span class="day-cta">Open Day 1 challenge →</span></div></a>
<div class="day"><strong>Day 02</strong><div><b>Design a KPI dictionary</b><p>Define 10 metrics with business meaning, formula, grain, owner, filters, caveats, and target direction.</p></div></div>
<div class="day"><strong>Day 03</strong><div><b>Answer five questions with SQL</b><p>Query revenue trends, order counts, AOV, customer cohorts, and returns. Explain the grain and joins.</p></div></div>
<div class="day"><strong>Day 04</strong><div><b>Investigate a performance decline</b><p>Compare periods and decompose change by volume, price/value, mix, customer, product, and region. Separate facts from hypotheses.</p></div></div>
<div class="day"><strong>Day 05</strong><div><b>Challenge misleading metrics</b><p>Find five ways a metric can mislead: denominator shifts, mix changes, averages hiding segments, timing, and data quality.</p></div></div>
<div class="day"><strong>Day 06</strong><div><b>Design the data model</b><p>Sketch a star schema. Define fact grain, dimensions, keys, relationships, and slowly changing attributes where relevant.</p></div></div>
<div class="day"><strong>Day 07</strong><div><b>Present a five-minute briefing</b><p>Summarize the business question, evidence, caveats, and recommended next action. Include one slide or one-page memo.</p></div></div>
</div>
<div class="week"><h3>Week 2 · Build with SQL and Power BI</h3>
<div class="day"><strong>Day 08</strong><div><b>Build a clean star schema</b><p>Create fact and dimension tables, validate keys, and document relationships.</p></div></div>
<div class="day"><strong>Day 09</strong><div><b>Write 10 useful DAX measures</b><p>Build base measures, ratios, distinct counts, and context-aware measures. Avoid unnecessary calculated columns.</p></div></div>
<div class="day"><strong>Day 10</strong><div><b>Create time intelligence</b><p>Build prior-period, year-to-date, rolling-period, and comparable-period measures. Validate date table behavior.</p></div></div>
<div class="day"><strong>Day 11</strong><div><b>Build drill-down analysis</b><p>Use hierarchies and drill-through to move from summary to contributing segments.</p></div></div>
<div class="day"><strong>Day 12</strong><div><b>Build dynamic KPI comparisons</b><p>Allow users to compare actuals with target and prior period, with clear variance logic.</p></div></div>
<div class="day"><strong>Day 13</strong><div><b>Create an executive dashboard</b><p>Design for decisions: concise overview, trends, drivers, exceptions, and action cues.</p></div></div>
<div class="day"><strong>Day 14</strong><div><b>Audit and simplify</b><p>Remove redundant visuals, test filters, check totals, validate measures, accessibility, and performance.</p></div></div>
</div>
<div class="week"><h3>Week 3 · Investigate and recommend</h3>
<div class="day"><strong>Day 15</strong><div><b>Detect an anomaly</b><p>Identify an unusual KPI movement. Define a baseline, threshold, and false-positive risk.</p></div></div>
<div class="day"><strong>Day 16</strong><div><b>Perform root-cause analysis</b><p>Decompose the movement, test plausible drivers, and state what evidence would disprove your explanation.</p></div></div>
<div class="day"><strong>Day 17</strong><div><b>Separate correlation from causation</b><p>Identify confounders and propose a credible experiment or quasi-experimental approach.</p></div></div>
<div class="day"><strong>Day 18</strong><div><b>Analyze segments and outliers</b><p>Compare customer, product, region, and channel segments. Explain how outliers affect averages.</p></div></div>
<div class="day"><strong>Day 19</strong><div><b>Quantify business impact</b><p>Estimate impact in currency or operational units, state assumptions, and show a sensitivity range.</p></div></div>
<div class="day"><strong>Day 20</strong><div><b>Recommend three actions</b><p>Rank actions by impact, effort, confidence, owner, and measurement plan.</p></div></div>
<div class="day"><strong>Day 21</strong><div><b>Defend your analysis</b><p>Prepare for five skeptical stakeholder questions. Acknowledge limitations and revise weak claims.</p></div></div>
</div>
<div class="week"><h3>Week 4 · Automate and prove your value</h3>
<div class="day"><strong>Day 22</strong><div><b>Automate repetitive reporting</b><p>Map the current process, remove manual steps, add validation, and document failure handling.</p></div></div>
<div class="day"><strong>Day 23</strong><div><b>Use Python to investigate data</b><p>Profile a dataset, assess missingness and duplicates, summarize drivers, and create a reproducible notebook or script.</p></div></div>
<div class="day"><strong>Day 24</strong><div><b>Design an AI-assisted workflow</b><p>Use AI to draft summaries or investigation prompts, but validate every calculation and source. Document privacy guardrails.</p></div></div>
<div class="day"><strong>Day 25</strong><div><b>Create a data quality framework</b><p>Define freshness, completeness, uniqueness, validity, consistency, and reconciliation checks.</p></div></div>
<div class="day"><strong>Day 26</strong><div><b>Solve a timed case study</b><p>In two hours, frame a problem, query data, build a compact analysis, and present a recommendation.</p></div></div>
<div class="day"><strong>Day 27</strong><div><b>Practice a senior analyst interview</b><p>Answer SQL, metric design, stakeholder, prioritization, and analytical judgment questions using specific examples.</p></div></div>
<div class="day"><strong>Day 28</strong><div><b>Publish a portfolio case study</b><p>Show problem, dataset, method, model, measures, findings, limitations, and actions. Include reproducible evidence.</p></div></div>
<div class="day"><strong>Day 29</strong><div><b>Rewrite your resume around impact</b><p>Turn responsibilities into evidence-backed accomplishment statements. Never invent business outcomes.</p></div></div>
<div class="day"><strong>Day 30</strong><div><b>Present to leadership</b><p>Deliver a concise executive presentation and a retrospective: strongest skill, remaining gap, and next 30-day goal.</p></div></div>
</div>
</section>

<section class="section">
<h2>Progress tracker</h2>
<p class="lead" style="font-size:14px">Your checkmarks are saved in this browser on this device. Use the export button to keep a backup.</p>
<div class="progress"><span id="progressFill"></span></div>
<p id="progressText" aria-live="polite">0 of 30 completed</p>
<div class="tracker" id="tracker"></div>
<div class="actions"><button class="primary" id="exportProgress">Export progress</button><button id="resetProgress">Reset checkmarks</button></div>
</section>

<section class="section">
<h2>Definition of done</h2>
<p>At the end of 30 days, your portfolio should contain one end-to-end business performance case study, a documented data model, reusable SQL and DAX, a concise executive narrative, and a clear account of limitations and decisions.</p>
<p><b>Start with Day 01.</b> Do not move to building a dashboard until you can explain the business question and how each KPI helps answer it.</p>
<p><a href="https://github.com/theanalystin/theanalyst.github.io">View the source on GitHub</a></p>
</section>
</div>
<script>
(function(){
 const key='theanalyst-30day-challenge-v1';
 const tracker=document.getElementById('tracker');
 const fill=document.getElementById('progressFill');
 const text=document.getElementById('progressText');
 let done={};
 try{done=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(e){done={}}
 function render(){
   tracker.innerHTML='';
   for(let i=1;i<=30;i++){
     const label=document.createElement('label');label.className='check';
     const input=document.createElement('input');input.type='checkbox';input.checked=!!done[i];
     input.addEventListener('change',()=>{done[i]=input.checked;localStorage.setItem(key,JSON.stringify(done));renderProgress()});
     const span=document.createElement('span');span.textContent='Day '+String(i).padStart(2,'0');
     label.append(input,span);tracker.append(label);
   }
   renderProgress();
 }
 function renderProgress(){const n=Object.values(done).filter(Boolean).length;text.textContent=n+' of 30 completed';fill.style.width=(n/30*100)+'%';}
 document.getElementById('exportProgress').addEventListener('click',()=>{
   const blob=new Blob([JSON.stringify({challenge:'30-Day Analytics Challenge',exportedAt:new Date().toISOString(),completedDays:Object.keys(done).filter(k=>done[k]).map(Number)},null,2)],{type:'application/json'});
   const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='analytics-challenge-progress.json';a.click();URL.revokeObjectURL(url);
 });
 document.getElementById('resetProgress').addEventListener('click',()=>{
   if(confirm('Clear all saved checkmarks on this device?')){done={};localStorage.removeItem(key);render();}
 });
 render();
})();
</script>

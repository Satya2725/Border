"""
ANTARDRISHTI — Streamlit Intelligence Dashboard
Command-center analytics view for defense analysts.

Run: streamlit run streamlit_app.py
SAFETY: No autonomous threat declarations — AI is advisory only.
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import random
import time

# ── Page Config ───────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="ANTARDRISHTI — Intelligence Dashboard",
    page_icon="🛰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ── Custom CSS ─────────────────────────────────────────────────────────────────
st.markdown("""
<style>
  .main { background-color: #050816; }
  .stApp { background-color: #050816; color: #E2E8F0; }
  .metric-card {
    background: #0F172A;
    border: 1px solid rgba(0,229,255,0.2);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
  }
  .neon-title {
    color: #00E5FF;
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 4px;
    text-shadow: 0 0 20px rgba(0,229,255,0.5);
  }
  .safety-note {
    background: rgba(255,193,7,0.08);
    border: 1px solid rgba(255,193,7,0.3);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: #FFC107;
  }
  div[data-testid="stMetricValue"] { color: #00E5FF !important; }
</style>
""", unsafe_allow_html=True)

# ── Header ────────────────────────────────────────────────────────────────────
col_logo, col_title, col_time = st.columns([1, 6, 2])
with col_logo:
    st.markdown("# 🛰")
with col_title:
    st.markdown('<div class="neon-title">ANTARDRISHTI</div>', unsafe_allow_html=True)
    st.caption("AI-Powered Weak Signal Intelligence Network")
with col_time:
    st.markdown(f"**{datetime.now().strftime('%d %b %Y %H:%M:%S')}**")
    st.markdown("🟢 **SYSTEM ONLINE**")

# Safety note
st.markdown("""
<div class="safety-note">
  ⚠️ <strong>SAFETY:</strong> This system identifies anomalies and unusual patterns only.
  AI is advisory — all outputs require human verification. No autonomous threat declarations are made.
</div>
""", unsafe_allow_html=True)
st.divider()

# ── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("### 🔧 Control Panel")
    refresh_rate = st.slider("Refresh Rate (s)", 5, 60, 10)
    risk_filter  = st.multiselect("Risk Filter", ["high", "medium", "low"], default=["high", "medium", "low"])
    region_filter= st.selectbox("Region", ["All", "J&K", "Punjab", "Himachal Pradesh", "Uttarakhand"])
    show_map     = st.checkbox("Show Heatmap", value=True)

    st.divider()
    st.markdown("### 📊 AI Model Status")
    st.progress(87, text="Anomaly Detection: 87%")
    st.progress(79, text="Signal Fusion: 79%")
    st.progress(65, text="Movement Pred: 65%")

    st.divider()
    if st.button("🔄 Refresh Data", use_container_width=True):
        st.rerun()

# ── KPI Metrics ───────────────────────────────────────────────────────────────
st.subheader("📡 Real-Time Intelligence Summary")
m1, m2, m3, m4, m5, m6 = st.columns(6)
metrics = [
    (m1, "Total Observations", "124,839", "+12.4%"),
    (m2, "Active Weak Signals", "3,847",   "+8.2%"),
    (m3, "Emerging Patterns",   "284",     "+5.7%"),
    (m4, "High Risk Zones",     "47",      "-3.1%"),
    (m5, "AI Confidence",       "87.3%",   "+2.3%"),
    (m6, "Under Review",        "129",     "-7.4%"),
]
for col, label, val, delta in metrics:
    with col:
        st.metric(label=label, value=val, delta=delta)

st.divider()

# ── Charts Row 1 ──────────────────────────────────────────────────────────────
col_trend, col_dist = st.columns([2, 1])

with col_trend:
    st.subheader("📈 30-Day Observation Trends")
    days = pd.date_range(end=datetime.now(), periods=30, freq='D')
    df_trend = pd.DataFrame({
        'Date':         days,
        'Observations': [80 + random.randint(0, 120) for _ in range(30)],
        'Anomalies':    [5  + random.randint(0, 25)  for _ in range(30)],
    })
    fig_trend = px.line(
        df_trend.melt(id_vars='Date', var_name='Metric', value_name='Count'),
        x='Date', y='Count', color='Metric',
        color_discrete_map={'Observations': '#00E5FF', 'Anomalies': '#FF4D4D'},
        template='plotly_dark'
    )
    fig_trend.update_layout(
        paper_bgcolor='rgba(15,23,42,0.8)',
        plot_bgcolor='rgba(0,0,0,0)',
        legend=dict(bgcolor='rgba(0,0,0,0)'),
        margin=dict(l=0, r=0, t=10, b=0)
    )
    st.plotly_chart(fig_trend, use_container_width=True)

with col_dist:
    st.subheader("🍩 Signal Distribution")
    labels = ['Sound','Environmental','Light','Animal','Smell']
    values = [34, 28, 18, 12, 8]
    fig_pie = go.Figure(data=[go.Pie(
        labels=labels, values=values,
        hole=0.6,
        marker_colors=['#00E5FF','#00FF88','#FFC107','#FF8C00','#A855F7']
    )])
    fig_pie.update_layout(
        paper_bgcolor='rgba(15,23,42,0.8)',
        plot_bgcolor='rgba(0,0,0,0)',
        showlegend=True,
        legend=dict(bgcolor='rgba(0,0,0,0)', font_color='#94A3B8'),
        margin=dict(l=0, r=0, t=10, b=0)
    )
    st.plotly_chart(fig_pie, use_container_width=True)

st.divider()

# ── Digital Twin Radar ────────────────────────────────────────────────────────
col_radar, col_risk = st.columns(2)

with col_radar:
    st.subheader("🎯 Digital Twin — Activity Radar")
    categories = ['Vehicle Activity','Light Activity','Animal Behaviour','Citizen Reports','Historical Obs','Sound Events']
    baseline = [65, 59, 72, 81, 88, 55]
    current  = [82, 90, 58, 74, 65, 88]

    fig_radar = go.Figure()
    fig_radar.add_trace(go.Scatterpolar(
        r=baseline + [baseline[0]], theta=categories + [categories[0]],
        fill='toself', name='Baseline',
        line_color='#00FF88', fillcolor='rgba(0,255,136,0.1)'
    ))
    fig_radar.add_trace(go.Scatterpolar(
        r=current + [current[0]], theta=categories + [categories[0]],
        fill='toself', name='Current',
        line_color='#FF4D4D', fillcolor='rgba(255,77,77,0.1)'
    ))
    fig_radar.update_layout(
        polar=dict(bgcolor='rgba(0,0,0,0)', radialaxis=dict(visible=True, gridcolor='rgba(0,229,255,0.1)'), angularaxis=dict(gridcolor='rgba(0,229,255,0.1)')),
        paper_bgcolor='rgba(15,23,42,0.8)',
        showlegend=True, legend=dict(bgcolor='rgba(0,0,0,0)', font_color='#94A3B8'),
        margin=dict(l=20, r=20, t=20, b=20)
    )
    st.plotly_chart(fig_radar, use_container_width=True)

with col_risk:
    st.subheader("⚠️ Risk Zone Evolution (8 Weeks)")
    weeks = [f"W{i+1}" for i in range(8)]
    fig_risk = go.Figure()
    for level, color, data in [
        ("High",   "#FF4D4D", [3,4,6,8,7,9,11,12]),
        ("Medium", "#FF8C00", [8,10,12,14,12,16,18,20]),
        ("Low",    "#00FF88", [20,22,25,28,24,30,35,40]),
    ]:
        fig_risk.add_trace(go.Scatter(x=weeks, y=data, name=level, line_color=color,
                                      mode='lines+markers', fill='tozeroy',
                                      fillcolor=color.replace(')',',0.05)').replace('rgb','rgba') if color.startswith('rgb') else color+'0D'))
    fig_risk.update_layout(
        paper_bgcolor='rgba(15,23,42,0.8)',
        plot_bgcolor='rgba(0,0,0,0)',
        legend=dict(bgcolor='rgba(0,0,0,0)', font_color='#94A3B8'),
        margin=dict(l=0, r=0, t=10, b=0),
        xaxis=dict(gridcolor='rgba(255,255,255,0.04)', tickfont_color='#94A3B8'),
        yaxis=dict(gridcolor='rgba(255,255,255,0.04)', tickfont_color='#94A3B8')
    )
    st.plotly_chart(fig_risk, use_container_width=True)

st.divider()

# ── Anomaly Table ─────────────────────────────────────────────────────────────
st.subheader("🔴 Active Anomaly Patterns (AI-Detected — Human Verification Required)")

anomaly_data = {
    "Pattern ID": ["ANM-2847", "ANM-2851", "ANM-2839", "ANM-2831", "ANM-2824"],
    "Location":   ["Sector 7, LOC", "Borderline KM 48", "Pine Forest A", "North Ridge", "Highway 44"],
    "Signals":    [4, 3, 3, 2, 2],
    "Confidence": ["82%", "71%", "58%", "44%", "36%"],
    "AI Label":   ["Anomaly Identified", "Unusual Activity Detected", "Emerging Pattern", "Emerging Pattern", "Anomaly Identified"],
    "Priority":   ["HIGH", "HIGH", "MEDIUM", "MEDIUM", "LOW"],
    "Recommendation": ["Human Verify", "Human Verify", "Monitor", "Monitor", "Data Gather"],
}
df_anomaly = pd.DataFrame(anomaly_data)

def color_priority(val):
    colors = {"HIGH": "color: #FF4D4D; font-weight: bold",
              "MEDIUM": "color: #FF8C00;", "LOW": "color: #00FF88;"}
    return colors.get(val, "")

st.dataframe(
    df_anomaly.style.applymap(color_priority, subset=["Priority"]),
    use_container_width=True,
    hide_index=True
)

st.divider()
st.caption("🛰 ANTARDRISHTI v2.0 | AI Advisory System | All outputs require human verification | Built for Hackathon 2025")

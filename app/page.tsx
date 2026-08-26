import Script from "next/script";

export const metadata = {
  title: "DannyBoy · BLOCK BOY",
  description: "复古掌机风俄罗斯方块，支持手机和电脑，并有班级排行榜。",
};

export default function Home() {
  return (
    <main className="app-shell">
      <div className="console-shell">
        <header className="device-header">
          <strong>DannyBoy</strong>
          <span>IGO · WORKSPACE</span>
          <div className="top-actions">
            <button id="rankBtn" className="icon-btn" aria-label="排行榜">RANK</button>
            <button id="soundBtn" className="icon-btn" aria-label="声音">SND</button>
            <button id="pauseBtn" className="icon-btn" aria-label="暂停">Ⅱ</button>
          </div>
        </header>

        <section className="screen-bezel">
          <div className="screen-status"><i /><span>BATTERY</span><b>DOT MATRIX WITH STEREO SOUND</b></div>
          <div className="lcd-panel">
            <section className="game-layout">
              <div className="board-wrap">
                <canvas id="gameCanvas" width="300" height="600" aria-label="俄罗斯方块游戏区域" />
                <div id="flash" className="line-flash" />
                <div id="centerMessage" className="center-message hidden" />

                <div id="nameModal" className="modal game-modal open">
                  <div className="pixel-panel name-panel">
                    <p className="eyebrow">BLOCK BOY</p>
                    <h1>BLOCK BOY</h1>
                    <p>WASD / 方向键控制<br />按空格硬降</p>
                    <label htmlFor="nameInput">输入玩家姓名</label>
                    <input id="nameInput" maxLength={16} autoComplete="nickname" placeholder="例如：小明" />
                    <button id="startBtn" className="primary-btn">开机开始</button>
                    <small>无需注册 · 成绩进入全班排行榜</small>
                  </div>
                </div>

                <div id="gameOverModal" className="modal game-modal">
                  <div className="pixel-panel result-panel">
                    <p className="eyebrow">GAME OVER</p><h2>挑战结束</h2>
                    <div className="result-score"><small>SCORE</small><strong id="finalScore">0</strong></div>
                    <p id="resultStatus">正在提交成绩…</p>
                    <div className="modal-actions"><button id="againBtn" className="primary-btn">再来一局</button><button id="resultRankBtn" className="secondary-btn">排行榜</button></div>
                  </div>
                </div>

                <div id="pauseModal" className="modal game-modal">
                  <div className="pixel-panel compact"><p className="eyebrow">PAUSED</p><h2>游戏暂停</h2><button id="resumeBtn" className="primary-btn">继续</button><button id="restartBtn" className="secondary-btn">重新开始</button></div>
                </div>
              </div>

              <aside className="lcd-sidebar">
                <div className="stat"><small>SCORE</small><b id="score">000000</b></div>
                <div className="stat best-stat"><small>BEST</small><b id="best">000000</b></div>
                <div className="stat"><small>LEVEL</small><b id="level">01</b></div>
                <div className="stat"><small>LINES</small><b id="lines">000</b></div>
                <div className="preview-box"><small>NEXT</small><canvas id="nextCanvas" width="120" height="100" /></div>
                <div className="preview-box hold-box"><small>HOLD</small><canvas id="holdCanvas" width="120" height="100" /></div>
                <div className="player-card"><small>PLAYER</small><strong id="playerName">---</strong></div>
                <div className="ready"><i /> READY</div>
              </aside>
            </section>
          </div>
        </section>

        <section className="mobile-controls" aria-label="游戏控制器">
          <div className="dpad">
            <button className="d-up" data-action="rotate" aria-label="旋转">W</button>
            <button className="d-left" data-action="left" aria-label="向左">A</button>
            <i />
            <button className="d-right" data-action="right" aria-label="向右">D</button>
            <button className="d-down" data-action="down" aria-label="加速下降">S</button>
          </div>
          <div className="action-pad">
            <div><button className="round b-button" data-action="drop" aria-label="快速落下">B</button><span>DROP</span></div>
            <div><button className="round a-button" data-action="rotate" aria-label="旋转">A</button><span>TURN</span></div>
          </div>
          <button className="hold-button" data-action="hold" aria-label="暂存方块">HOLD</button>
        </section>

        <footer className="device-help">← → / A D 移动　·　↑ / W 旋转　·　↓ / S 加速　·　空格硬降　·　P 暂停</footer>
      </div>

      <div id="rankModal" className="modal rank-modal">
        <div className="pixel-panel rank-panel">
          <button id="closeRankBtn" className="close-btn" aria-label="关闭">×</button>
          <p className="eyebrow">HALL OF FAME</p><h2>全班排行榜</h2>
          <div className="rank-head"><span>名次 / 玩家</span><span>分数</span></div>
          <ol id="rankList" className="rank-list"><li className="loading">正在读取排行榜…</li></ol>
          <button id="rankPlayBtn" className="primary-btn">开始挑战</button>
        </div>
      </div>

      <Script src="/game.js?v=3" strategy="afterInteractive" />
    </main>
  );
}

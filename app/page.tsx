import Script from "next/script";

export const metadata = {
  title: "DannyBoy 俄罗斯方块",
  description: "经典街机俄罗斯方块，支持手机和电脑，并有班级排行榜。",
};

export default function Home() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span>DANNYBOY</span><strong>俄罗斯方块</strong></div>
        <div className="top-actions">
          <button id="rankBtn" className="icon-btn" aria-label="排行榜">🏆</button>
          <button id="soundBtn" className="icon-btn" aria-label="声音">🔊</button>
          <button id="pauseBtn" className="icon-btn" aria-label="暂停">Ⅱ</button>
        </div>
      </header>

      <section className="game-layout">
        <aside className="stats left-stats">
          <div className="stat"><small>SCORE</small><b id="score">000000</b></div>
          <div className="stat"><small>BEST</small><b id="best">000000</b></div>
          <div className="stat"><small>LINES</small><b id="lines">000</b></div>
          <div className="stat"><small>LEVEL</small><b id="level">01</b></div>
        </aside>

        <div className="board-wrap">
          <canvas id="gameCanvas" width="300" height="600" aria-label="俄罗斯方块游戏区域" />
          <div id="flash" className="line-flash" />
          <div id="centerMessage" className="center-message hidden" />
        </div>

        <aside className="side-panel">
          <div className="preview-box"><small>NEXT</small><canvas id="nextCanvas" width="120" height="100" /></div>
          <div className="preview-box"><small>HOLD</small><canvas id="holdCanvas" width="120" height="100" /></div>
          <div className="player-card"><small>PLAYER</small><strong id="playerName">---</strong></div>
          <div className="keys"><span>← → 移动</span><span>↑ 旋转</span><span>↓ 加速</span><span>空格 落下</span><span>C 暂存</span></div>
        </aside>
      </section>

      <section className="mobile-controls" aria-label="手机游戏控制">
        <button data-action="left" aria-label="向左">◀</button>
        <button data-action="rotate" aria-label="旋转">↻</button>
        <button data-action="right" aria-label="向右">▶</button>
        <button data-action="down" aria-label="加速下降">▼</button>
        <button data-action="drop" className="drop" aria-label="快速落下">落下</button>
        <button data-action="hold" aria-label="暂存方块">暂存</button>
      </section>

      <div id="nameModal" className="modal open">
        <div className="pixel-panel name-panel">
          <p className="eyebrow">WELCOME PLAYER</p>
          <h1>DANNYBOY<br /><span>俄罗斯方块</span></h1>
          <p>第一次来？输入你的名字，成绩就会出现在全班排行榜。</p>
          <label htmlFor="nameInput">玩家姓名</label>
          <input id="nameInput" maxLength={16} autoComplete="nickname" placeholder="例如：小明" />
          <button id="startBtn" className="primary-btn">开始游戏</button>
          <small>无需注册 · 只记录昵称和游戏成绩</small>
        </div>
      </div>

      <div id="gameOverModal" className="modal">
        <div className="pixel-panel result-panel">
          <p className="eyebrow">GAME OVER</p><h2>挑战结束</h2>
          <div className="result-score"><small>SCORE</small><strong id="finalScore">0</strong></div>
          <p id="resultStatus">正在提交成绩…</p>
          <div className="modal-actions"><button id="againBtn" className="primary-btn">再来一局</button><button id="resultRankBtn" className="secondary-btn">查看排行榜</button></div>
        </div>
      </div>

      <div id="pauseModal" className="modal">
        <div className="pixel-panel compact"><p className="eyebrow">PAUSED</p><h2>游戏暂停</h2><button id="resumeBtn" className="primary-btn">继续</button><button id="restartBtn" className="secondary-btn">重新开始</button></div>
      </div>

      <div id="rankModal" className="modal">
        <div className="pixel-panel rank-panel">
          <button id="closeRankBtn" className="close-btn" aria-label="关闭">×</button>
          <p className="eyebrow">HALL OF FAME</p><h2>全班排行榜</h2>
          <div className="rank-head"><span>名次 / 玩家</span><span>分数</span></div>
          <ol id="rankList" className="rank-list"><li className="loading">正在读取排行榜…</li></ol>
          <button id="rankPlayBtn" className="primary-btn">开始挑战</button>
        </div>
      </div>

      <Script src="/game.js" strategy="afterInteractive" />
    </main>
  );
}

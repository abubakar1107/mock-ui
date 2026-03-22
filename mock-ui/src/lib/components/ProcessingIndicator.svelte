<div class="indicator">
  <div class="glow"></div>
  <div class="bowl">
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cauldron body -->
      <path
        d="M9 14.5 C9 14.5 7.5 24 12 26 C14 27 18 27 20 26 C24.5 24 23 14.5 23 14.5"
        fill="rgba(196,83,58,0.3)"
        stroke="rgba(196,83,58,0.85)"
        stroke-width="1.3"
        stroke-linecap="round"
      />

      <!-- Rim -->
      <line x1="7" y1="14.5" x2="25" y2="14.5" stroke="rgba(196,83,58,0.9)" stroke-width="1.6" stroke-linecap="round"/>

      <!-- Left handle -->
      <path d="M7 14.5 C4.5 13.5 4 16.5 7 16" fill="none" stroke="rgba(196,83,58,0.6)" stroke-width="1"/>
      <!-- Right handle -->
      <path d="M25 14.5 C27.5 13.5 28 16.5 25 16" fill="none" stroke="rgba(196,83,58,0.6)" stroke-width="1"/>

      <!-- Liquid with wave animation -->
      <path fill="rgba(196,83,58,0.4)">
        <animate
          attributeName="d"
          values="M10 16 Q13 18 16 16.5 Q19 15 22 16.5 L21.5 24 Q16 26.5 10.5 24 Z;
                  M10 16.5 Q13 15 16 16 Q19 18 22 16 L21.5 24 Q16 26.5 10.5 24 Z;
                  M10 16 Q13 18 16 16.5 Q19 15 22 16.5 L21.5 24 Q16 26.5 10.5 24 Z"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>

      <!-- Stirring stick -->
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-15 16 20;15 16 20;-15 16 20"
          dur="1.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
        />
        <line x1="16" y1="4" x2="16" y2="20" stroke="rgba(196,83,58,0.8)" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="16" cy="4" r="1.2" fill="none" stroke="rgba(196,83,58,0.7)" stroke-width="0.9"/>
      </g>

      <!-- Bubble 1 - left, large -->
      <circle fill="rgba(196,83,58,0.9)">
        <animate attributeName="cy" values="21;14;8" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="13;12;14" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;0.5;0" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1.2;2;0.8" dur="1.8s" repeatCount="indefinite"/>
      </circle>

      <!-- Bubble 2 - right, delayed -->
      <circle fill="rgba(196,83,58,0.85)">
        <animate attributeName="cy" values="20;14;9" dur="2.2s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="19;20;18" dur="2.2s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.85;0.45;0" dur="2.2s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1;1.8;0.5" dur="2.2s" begin="0.6s" repeatCount="indefinite"/>
      </circle>

      <!-- Bubble 3 - center, big -->
      <circle fill="rgba(196,83,58,0.88)">
        <animate attributeName="cy" values="20;12;7" dur="1.6s" begin="1.1s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="16;15;17" dur="1.6s" begin="1.1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;0.45;0" dur="1.6s" begin="1.1s" repeatCount="indefinite"/>
        <animate attributeName="r" values="1.4;2.2;0.6" dur="1.6s" begin="1.1s" repeatCount="indefinite"/>
      </circle>

      <!-- Bubble 4 - small fast one -->
      <circle fill="rgba(196,83,58,0.8)">
        <animate attributeName="cy" values="19;13;8" dur="1.3s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="15;16;14" dur="1.3s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.4;0" dur="1.3s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="r" values="0.8;1.5;0.3" dur="1.3s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
</div>

<style>
  .indicator {
    position: relative;
    width: 32px;
    height: 32px;
  }

  .glow {
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(196,83,58,0.2) 30%, transparent 70%);
    animation: glow-pulse 2.5s ease-in-out infinite;
  }

  .bowl {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #fdf6f0;
    border: 1.5px solid rgba(196,83,58,0.35);
    box-shadow:
      0 0 0 3px rgba(196,83,58,0.1),
      0 2px 8px rgba(196,83,58,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .bowl svg {
    width: 28px;
    height: 28px;
  }

  @keyframes glow-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.12); }
  }
</style>

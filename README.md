# フェイスケアブランド LP（ポートフォリオ）

“**必要なものだけ**” をコンセプトにした化粧品LPのデモです。  
**SEO/OGP/GA4/アクセシビリティ/モバイル最適化**まで最小実装をカバーし、**短納期・小規模案件**にも対応できる構成にしています。

- **Live（デモURL）**：https://YOUR.DOMAIN/
- **お問い合わせ**：you@example.com ／ @yourname（SNS）

> このリポジトリはポートフォリオです。実運用時は画像や文言、計測IDを本番用に差し替えます。

---

## 1. ご依頼いただくことで得られる価値

- **すぐ立ち上がる**：静的HTML/CSS/JSで軽量。Pages/Netlify/Vercelに即時デプロイ  
- **効果が見える**：**GA4**で**Thank You到達（purchase）**まで計測配線済み  
- **SNSで綺麗にシェア**：OGP/Twitter Card整備、カード崩れを回避  
- **検索の土台**：`title/description/canonical`、JSON‑LD（**Organization / Product+Offer**）  
- **スマホ優先**：ヒーローに `srcset/sizes`、CLS対策（`width/height`・`fetchpriority`）  
- **使いやすいUI**：上品ナビ（フォーカス/アンダーライン）、USPバー、空状態/バリデーション

> ご予算・納期に応じて**柔軟にスコープ設計**します（要件確定後にお見積り）。

---

## 2. 主な機能（静的＋動的）

- **共通ヘッダー/ナビ**、**USPバー**、**ヒーロー：クロスフェード＋CTA自動切替**
- **製品一覧/詳細**（`Product/Offer` microdata、`aria-live` で価格更新）
- **カート**：`localStorage` で数量・小計・合計を管理
- **チェックアウト（デモ）**：**Stripe Checkout** による決済遷移（*サーバ別ホスト*）
- **Thank You**：**GA4 `purchase`** 送信、`noindex`

---

## 3. 公開情報（GitHub Pages + 別ホストAPI）

このLPは **GitHub Pages** で公開し、**決済デモ（Stripe）用のAPIを別ホスト**に分離しています。  
小規模サイトからフォーム/決済まで、段階的に拡張できる構成です。

- 公開URL: https://USERNAME.github.io/REPO/
- ソースコード: https://github.com/USERNAME/REPO
- 決済API（例）: https://your-checkout-api.onrender.com

> テストカード番号（Stripe）：`4242 4242 4242 4242` / 任意の未来日 / 任意CVC / 任意郵便番号

---

## 4. デプロイ手順

### 4.1 GitHub Pages（静的）
1. `Settings` → `Pages` → Branch: `main` を選択（`/root`）  
2. `<head>` の `YOUR.DOMAIN` を公開URLに置換（`canonical`/`og:url`/`twitter:image` 等）  
3. OGP画像（1200×630）・faviconを配置

### 4.2 Stripe API（Renderの例）
1. Render で「New Web Service」→ Node でリポジトリを指定  
2. 環境変数を設定：  
   - `STRIPE_SECRET_KEY=sk_test_...`  
   - `ALLOW_ORIGIN=https://USERNAME.github.io/REPO`  
   - `SUCCESS_URL=https://USERNAME.github.io/REPO/thankyou.html`  
   - `CANCEL_URL=https://USERNAME.github.io/REPO/cart.html`  
   - `PRICE_MAP=essence-30ml:price_123,toner-150ml:price_456`  
3. デプロイ後、`/health` が 200 を返すことを確認  
4. フロント側（`checkout.html`）の `API_BASE` を Render のURLに差し替え

> **秘密鍵は必ず環境変数で管理**し、リポジトリにはコミットしません。

---

## 5. GA4（最小イベント）

- 実装済み：`purchase`（Thank You）
- 追加推奨：`add_to_cart`（商品追加）/ `begin_checkout`（決済開始）/ `view_item` / `view_item_list` / `select_item`

```js
gtag?.('event','add_to_cart',{
  currency:'JPY',
  value: 2900,
  items:[{ item_id:'essence-30ml', item_name:'エッセンス 30mL', price:2900, quantity:1 }]
});
```

---

## 6. ディレクトリ

```
/
├─ index.html            # トップ（ヒーロー＋FAQ）
├─ purchase.html         # 製品一覧
├─ product-*.html        # 製品詳細（Product/Offer microdata）
├─ cart.html / checkout.html / thankyou.html
├─ site.css              # 共通スタイル（--accent）
├─ assets/               # 画像（hero/ogp/logo 等）
└─ server/               # （任意）サーバ側コードの参考置き場
```

---

## 7. 品質チェック（納品前）

- [ ] Lighthouse：Performance / Accessibility / SEO  
- [ ] OGP/Twitter：共有プレビュー確認  
- [ ] GA4：**Realtime/DebugView** でイベント確認  
- [ ] `YOUR.DOMAIN` 置換漏れなし（`canonical/og:url/twitter:image`）

---

## 8. 免責

- 画像はダミー（Adobe Stock等）です。商用利用時は差し替えます。  
- 本リポジトリは学習・ポートフォリオ目的。二次配布はご相談ください。  
- © 2025 フェイスケアブランド（ポートフォリオ）

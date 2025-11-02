# 🧴 フェイスケアブランド LP（ポートフォリオ）

“必要なものだけ” をコンセプトにした **化粧品ブランドLPのデモサイト** です。  
SEO / OGP / GA4 / アクセシビリティ / モバイル最適化 まで最小構成で実装し、  
**短端期・小規模案件（1〜5万円規模）** に対応できる構成になっています。

---

## 🌐 デモ・連絡先

- **Live（デモURL）**：  
  https://Sheep1755.github.io/facecare-lp/
- **お問い合わせ**：  
  you@example.com ／ [@yourname](https://twitter.com/yourname)
- **本リポジトリはポートフォリオです。**  
  実運用時は画像・文言・GA/Stripeキーなどを本番用に差し替えてください。

---

## 🎯 このLPで得られる価値

| 特徴 | 内容 |
|------|------|
| 🚀 すぐ立ち上がる | 静的HTML/CSS/JS構成で軽量。Pages/Netlify/Vercel即時デプロイ可能。 |
| 📊 効果が見える | GA4で **Thank You到達（purchaseイベント）** まで計測準備済み。 |
| 💬 SNSで美しくシェア | OGP/Twitter Card完全対応。シェア時のカード崩れを防止。 |
| 🔍 検索の土台 | title / description / canonical / JSON-LD（Organization, Product+Offer）実装済み。 |
| 📱 スマホ優先 | srcset/sizes対応・CLS対策・ヒーローlazy最適化済み。 |
| 🦯 UXに配慮 | アクセシブルなナビゲーション、USPバー、バリデーション、空カート表示など。 |

---

## ⚙️ 主な機能（静的＋動的）

| 区分 | 機能 |
|------|------|
| 🧱 共通UI | ヘッダー/ナビゲーション・USPバー・ヒーロースライダー（クロスフェード） |
| 🛍 製品一覧/詳細 | Product + Offer microdata対応・動的価格更新（aria-live） |
| 🗳 カート | localStorageで商品・数量・小計を永続管理 |
| 💳 チェックアウト | Stripe Checkout API連携（Renderホスト）／/diagによる動的SKUマッピング |
| ✅ Thank You | GA4 purchase送信、cartクリア、noindex指定済み |
| 🌐 OGP/SEO | meta, twitter, ogp画像（1200×630）整備済み |

---

## ☁️ 公開構成

| 要素 | 内容 |
|------|------|
| **フロントエンド** | GitHub Pages（静的） |
| **決済API** | Render (Node + Express + Stripe SDK) |
| **CORS許可** | ALLOW_ORIGIN=https://Sheep1755.github.io/facecare-lp/ |
| **デモ決済** | Stripe test mode（テストカード 4242 4242 4242 4242） |

この構成により、**静的LP → 決済までワンストップ動作** を実現。  
小規模サイトからフォーム・EC機能まで段階的に拡張可能です。

---

## 🚀 デプロイ手順

### 1. GitHub Pages（静的サイト）
1. `Settings → Pages → Branch: main (/root)` を選択  
2. `<head>` 内のURLを公開URL（`https://Sheep1755.github.io/facecare-lp/`）に置換  
3. OGP画像（1200×630）・favicon配置  
4. コミット＆プッシュ後、1〜2分で反映完了  

### 2. Stripe API（Render）
1. Renderで「New Web Service」→ Nodeリポジトリを選択  
2. 環境変数を設定：

```bash
STRIPE_SECRET_KEY=sk_test_********
ALLOW_ORIGIN=https://Sheep1755.github.io/facecare-lp
SUCCESS_URL=https://Sheep1755.github.io/facecare-lp/thankyou.html
CANCEL_URL=https://Sheep1755.github.io/facecare-lp/cart.html
PRICE_MAP_JSON={"toner-150":"price_xxx","toner-300":"price_xxx", ...}
```

3. `/health` が200を返すことを確認  
4. フロント側の `checkout.html` にある `API_BASE` をRender URLへ差し替え  

> 🔐 Stripe秘密鍵は環境変数で管理し、リポジトリに含めないでください。

---

## 📈 GA4イベント（実装済）

| イベント | 発火場所 | 備考 |
|-----------|-----------|------|
| `purchase` | Thank You | cart内容を送信し、購入金額を集計 |
| *(追加推奨)* | `add_to_cart`, `begin_checkout`, `view_item` | 構造を共通化し、今後拡張可 |

実装例：
```js
gtag('event','add_to_cart',{
  currency:'JPY',
  value:2900,
  items:[{ item_id:'essence-30', item_name:'エッセンス 30mL', price:2900, quantity:1 }]
});
```

---

## 🗂 ディレクトリ構成

```
/
├─ index.html          # トップページ（ヒーロー＋FAQ）
├─ purchase.html       # 製品一覧
├─ product-*.html      # 各製品詳細
├─ cart.html           # カート
├─ checkout.html       # Stripeチェックアウト連携
├─ thankyou.html       # 購入完了ページ（GA4+cartクリア）
├─ styles/site.css     # 共通スタイル
├─ assets/             # 画像・OGP・faviconなど
└─ server/             # Stripe API（Render用参考コード）
```

---

## ✅ 品質チェック（納品前確認）

| 項目 | チェック方法 |
|------|---------------|
| 💡 パフォーマンス | Lighthouse：Performance 90以上 |
| ♿ アクセシビリティ | コントラスト・aria・キーボード操作確認 |
| 🔍 SEO | title/description/canonical漏れな


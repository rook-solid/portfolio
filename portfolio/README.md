# IT Engineer Portfolio

モダンなITエンジニアのポートフォリオサイトです。  
純粋なHTML / CSS / JavaScriptで構築されており、**Cloudflare Pagesに即デプロイ可能**です。

## 📁 ディレクトリ構成

```
portfolio/
├── index.html            # メインページ
├── _headers              # Cloudflare Pages セキュリティヘッダー
├── _redirects            # Cloudflare Pages リダイレクト設定
└── assets/
    ├── css/
    │   └── style.css     # スタイルシート
    ├── js/
    │   └── main.js       # JavaScript
    └── images/
        └── avatar.png    # プロフィール画像
```

## 🎨 機能・デザイン

- **白基調のクリーンデザイン** + アクセントカラー（インディゴ）
- **レスポンシブ対応**（モバイル・タブレット・デスクトップ）
- スクロール連動ヘッダー・アクティブナビ
- スキルバーのアニメーション（スクロール時に発動）
- スクロールリビール（AOS相当）
- モバイルハンバーガーメニュー
- ページ内スムーズスクロール
- トップへ戻るボタン
- コンタクトフォーム（バリデーション・サクセスメッセージ付き）

## セクション

| セクション | 内容 |
|-----------|------|
| Hero | タイトル・キャッチコピー・コードカード |
| About Me | 自己紹介・スタッツ・情報パネル |
| Skills | フロントエンド / バックエンド / インフラ / ツール |
| Projects | 4件のプロジェクトカード（ダミーデータ）|
| Contact | SNSリンク + お問い合わせフォーム |

## 🚀 Cloudflare Pages へのデプロイ

1. `portfolio/` フォルダを GitHub リポジトリにプッシュ
2. [Cloudflare Pages](https://pages.cloudflare.com/) でプロジェクトを作成
3. ビルド設定：
   - **Build command**: _(空欄)_
   - **Build output directory**: `/` または `portfolio`
4. デプロイ完了！

## ✏️ カスタマイズ

`index.html` を直接編集するだけで内容を変更できます：

- 氏名・プロフィール → `About` セクション
- 技術スタック → `Skills` セクション
- 実績 → `Projects` セクション
- SNS・メール → `Contact` セクション

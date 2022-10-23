# heic2PNG
 heic画像をまとめてpngに変換する


## GCP Deploy
### 0.前提条件
- GCPアカウントは有効済み
- Google Cloud SDKはクライアントに設定済み
- GCPのCloudStorageに静的サイトは構築済み

### 1. プロジェクトルートフォルダにapp.yamlを作成する
app.yamlのサンプル

```
runtime: nodejs14
handlers:
# Serve all static files with url ending with a file extension
- url: /(.*\..+)$
  static_files: build/\1
  upload: build/(.*\..+)$
# Catch all handler to index.html
- url: /.*
  static_files: build/index.html
  upload: build/index.html
```

### 2. React appをGCPにDeploy
プロジェクトロートで以下のコマンドを実行して、作成した静的サイトにDeployする
YOUR_PROJECT_IDは、GCPの静的サイトの設定から確認できる。

`npm run build && gcloud app deploy --project=YOUR_PROJECT_ID`

### 3. Deployした結果をブラウザで確認
以下のコマンドを実行して、ブラウザでReact appを確認できる

`gcloud app browse`
## GitHub Copilot Chat

- Extension Version: 0.23.2 (prod)
- VS Code: vscode/1.96.2
- OS: Mac

## Network

User Settings:

```json
  "http.proxySupport": "off",
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:

- DNS ipv4 Lookup: 20.205.243.168 (81 ms)
- DNS ipv6 Lookup: ::ffff:20.205.243.168 (2 ms)
- Proxy URL: None (8 ms)
- Electron fetch (configured): HTTP 200 (253 ms)
- Node.js https: HTTP 200 (560 ms)
- Node.js fetch: HTTP 200 (379 ms)
- Helix fetch: HTTP 200 (222 ms)

Connecting to https://api.githubcopilot.com/_ping:

- DNS ipv4 Lookup: 140.82.114.21 (9 ms)
- DNS ipv6 Lookup: ::ffff:140.82.114.21 (1 ms)
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (263 ms)
- Node.js https: HTTP 200 (793 ms)
- Node.js fetch: HTTP 200 (1713 ms)
- Helix fetch: HTTP 200 (770 ms)

## Documentation

In corporate networks:
[Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).

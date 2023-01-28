# Breaking Change Frequency

[Back to root readme.md](../readme.md)

You may be wondering how often this package releases breaking changes with a major version bump to remove deprecations. Now that the package is stable and used in many production systems the answer is not very often. Ideally it'll remove deprecations with a new major version bump every 3 years to avoid irritation.

Unless the API needs to change or there's a breaking change from Node that impacts the package, there's no intention of bumping the major version for Node bumps, the CI here will always test [all of the versions of Node in active LTS](https://github.com/nodejs/Release).

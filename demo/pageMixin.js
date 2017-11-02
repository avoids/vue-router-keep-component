const indexPath = '/'
export default {
    computed: {
        pageParams () {
            const {$route} = this

            return $route ? {
                ...$route.params,
                ...$route.query
            } : {}
        }
    },
    methods: {
        // 路由前进页面（第一级使用）
        routerGoPage (location, onComplete, onAbort) {
            const {$router} = this
            $router && $router.replace(location, onComplete, onAbort)
        },
        // 路由后退页面（第二级使用）
        routerBackPage (location, onComplete, onAbort) {
            const {$router} = this
            $router && $router.replace(location || indexPath, onComplete, onAbort)
        },
        // 嵌套路由前进页面（一般第二级开始使用）
        routerNestGoPage (location, onComplete, onAbort) {
            const {$router} = this
            $router && $router.push(location, onComplete, onAbort)
        },
        // 嵌套路由前进页面（一般第二级开始使用，带url参数到目标url）
        routerNestQueryGoPage (location, onComplete, onAbort) {
            const {$router, $route} = this
            if ($router) {
                if (typeof location === 'string') {
                    location = {
                        path: location
                    }
                }
                location.query = location.query || {}
                let query = {...$route.query}
                if (Object.keys(query).length) {
                    let _a = query._a && JSON.parse(query._a)
                    delete query._a
                    location.query._a = (_a || []).concat({
                        p: $route.path,
                        q: query
                    })
                } else {
                    location.query._a = [{
                        p: $route.path
                    }]
                }
                location.query._a = JSON.stringify(location.query._a)
                $router.replace(location, onComplete, onAbort)
            }
        },
        // 嵌套路由后退页面（一般第三级开始使用）
        routerNestBackPage () {
            const {$router, $route} = this
            if ($router) {
                let query = $route.query
                let _a = query._a && JSON.parse(query._a)
                if (_a && _a.length) {
                    let param = _a.pop()
                    $router.replace({
                        path: param.p,
                        query: param.q
                    })
                } else {
                    // 只能回退
                    $router.go(-1)
                }
            }
        }
    }
}

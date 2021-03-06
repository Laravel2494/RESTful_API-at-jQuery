/*!
 * jQuery restful plugin v1.0.5
 * https://github.com/myspace-nu
 *
 * Copyright 2018 Johan Johansson
 * Released under the MIT license
 */

! function (c) {
    c.fn.serializeObject = function () {
        var e = {},
            t = this.serializeArray();
        return c.each(t, function () {
            e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]), e[this.name].push(this.value || "")) : e[this.name] = this.value || ""
        }), e
    }, c.fn.restful = function (e) {
        var l = c.extend({
            url: null,
            method: "POST",
            onComplete: function () {},
            onSuccess: function () {},
            onError: function () {},
            dataType: "json",
            preventHammering: !0,
            defaultValue: null
        }, e);
        l.url && (l.url = l.url.replace(/\/+$/, "")), this.each(function () {
            "form" == this.tagName.toLowerCase() ? c(this).submit(function (e) {
                e.preventDefault();
                var t = c(e.target).find("input[type=submit]:focus,button:focus");
                l.preventHammering && c(t).prop("disabled", !0);
                var a = c(this).serializeObject(),
                    r = c(this).attr("action");
                !r.match(/^(\w{3,5}\:)?\/+/) && l.url && (r = l.url + "/" + r.replace(/^\/+/, ""));
                var n = r.match(/{+\:?\w+}+/g);
                for (var s in n) {
                    var o = n[s].match(/\w+/);
                    r = r.replace(n[s], a[o[0]] || a[o[0].toLowerCase()] || l.defaultValue), delete a[o[0]]
                }
                var i = {
                    url: r,
                    type: c(this).attr("method") || l.method,
                    context: this,
                    success: function (e) {
                        l.onSuccess.call(this, e)
                    },
                    error: function (e) {
                        l.onError.call(this, e)
                    },
                    complete: function (e) {
                        l.preventHammering && c(t).prop("disabled", !1), l.onComplete.call(this, e)
                    }
                };
                "get" == i.type.toLowerCase() ? i.url += "?" + c.param(a) : "json" == l.dataType.toLowerCase() ? (i.contentType = "application/json; charset=utf-8", i.dataType = "json", i.data = JSON.stringify(a)) : i.data = a, c.ajax(i)
            }) : c(this).click(function (e) {
                e.preventDefault();
                var t = this;
                if (l.preventHammering) {
                    if (c(t).hasClass("disabled")) return;
                    c(t).addClass("disabled")
                }
                var a = c(this).data(),
                    r = c(this).attr("href");
                !r.match(/^(\w{3,5}\:)?\/+/) && l.url && (r = l.url + "/" + r.replace(/^\/+/, ""));
                var n = r.match(/{+\:?\w+}+/g);
                for (var s in n) {
                    var o = n[s].match(/\w+/);
                    r = r.replace(n[s], a[o[0]] || a[o[0].toLowerCase()] || l.defaultValue), delete a[o[0].toLowerCase()]
                }
                var i = {
                    url: r,
                    type: l.method,
                    context: this,
                    success: function (e) {
                        l.onSuccess.call(this, e)
                    },
                    error: function (e) {
                        l.onError.call(this, e)
                    },
                    complete: function (e) {
                        l.preventHammering && c(t).removeClass("disabled"), l.onComplete.call(this, e)
                    }
                };
                "get" == i.type.toLowerCase() ? i.url += "?" + c.param(a) : "json" == l.dataType.toLowerCase() ? (i.contentType = "application/json; charset=utf-8", i.dataType = "json", i.data = JSON.stringify(a)) : i.data = a, c.ajax(i)
            })
        })
    }
};

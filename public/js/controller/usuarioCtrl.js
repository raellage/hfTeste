app.controller('UsuarioCtrl', function($scope, $http, $location, AuthService) {

    AuthService.logout();

    $scope.cadastrar = function() {
        var usuario = $scope.usuario;
        $http.post('/api/usuarios/cadastrar', usuario).then(function(response) {

            if (usuario.senha == usuario.confirmaSenha) {
                if (response.data.erroMsg) {
                    Materialize.toast(response.data.erroMsg, 4000);
                } else {
                    $location.path('/usuarios/login');
                    Materialize.toast(response.data.msg, 4000);
                }
            } else {
                Materialize.toast("Senhas não conferem!", 4000);
            }
        });
    };

    $scope.login = function() {
        var usuario = $scope.usuario;
        $http.post("/api/usuarios/login", usuario).then(function(response) {
            if (response.data.erroMsg) {
                Materialize.toast(response.data.erroMsg, 4000);
            } else {
                AuthService.setToken(response.data.token);
                AuthService.setUsuario(response.data.usuario);
                console.log(response.data.token);
                console.log(response.data.usuario);
                $location.path('/produtos');
                Materialize.toast("Bem-vindo " + response.data.usuario, 4000);
            }
        });
    };

    $scope.refresh = function() {
        var email = {
            email: AuthService.getUsuario()
        };
        $http.post("/api/usuarios/refresh", email).then(function(response) {
            if (response.data.erroMsg) {
                Materialize.toast(response.data.erroMsg, 4000);
            } else {
                AuthService.setToken(response.data.token);
                console.log(response.data.token);
                console.log(response.data.usuario);
                window.history.back();
                Materialize.toast("Bem-vindo " + response.data.usuario, 4000);
            }
        });
    };

});
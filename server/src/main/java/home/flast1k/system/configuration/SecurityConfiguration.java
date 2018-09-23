//package home.flast1k.system.configuration;
//
//import home.flast1k.system.service.CustomUserDetailsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//    @Autowired
//    private CustomUserDetailsService userDetailsService;
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth)
//            throws Exception {
//        auth.authenticationProvider(authenticationProvider());
//    }
//
//    @Bean
//    public DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authProvider
//                = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(userDetailsService);
//        authProvider.setPasswordEncoder(encoder());
//        return authProvider;
//    }
////
//    @Bean
//    public PasswordEncoder encoder() {
//        return new BCryptPasswordEncoder(11);
//    }
////    @Override
////    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
////        auth.inMemoryAuthentication()
////                .withUser("user").password("{noop}password").roles("ADMIN")
////                .and()
////                .withUser("manager").password("{noop}password").roles("MANAGER");
////    }
////
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/login","/home","/","/user","/history","/charsets", "/version","/*.js","/*.js.map", "/*.css", "/*.ico").permitAll()
//                .anyRequest().fullyAuthenticated().and()
//                /* "/logout" will log the user out by invalidating the HTTP Session,
//                 * cleaning up any {link rememberMe()} authentication that was configured, */
//                .logout()
//                .permitAll()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
//                .and()
//                // enabling the basic authentication
//                .httpBasic().and()
//                // configuring the session on the server
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and()
//                // disabling the CSRF - Cross Site Request Forgery
//                .csrf().disable();
//
//    }
////    }
//}


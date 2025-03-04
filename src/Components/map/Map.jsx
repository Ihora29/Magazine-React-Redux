import React from 'react';
import { MapContainer, TileLayer, Polygon, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { useState } from 'react';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import shopicon from '../../images/shop-svgrepo-com.svg'


export default function Map({ address, setAddress }) {
    const [position, setPosition] = useState([49.8397, 24.0297]); // Початкові координати (Львів)

    const mapRef = useRef();

    const customMarker = new L.Icon({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    const customMarkerShop = new L.Icon({
        iconUrl: shopicon,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });



    const deliveryZones = [

        {
            name: "Левандівка",
            color: "yellow",
            coordinates: [
                [
                    [49.8700, 23.9600],
                    [49.8600, 24.0000],
                    [49.8500, 24.0300],
                    [49.8350, 24.0500],
                    [49.8100, 24.0400],
                    [49.8000, 24.0100],
                    [49.8050, 23.9800],
                    [49.8200, 23.9600],
                    [49.8400, 23.9500]
                ]
            ]
        },
        {
            name: "центр",
            color: "green",
            coordinates: [
                [
                    [49.8110, 23.9900], // Верхній лівий кут
                    [49.8180, 23.9950],
                    [49.8230, 24.0050], // Верхній правий кут
                    [49.8180, 24.0150],
                    [49.8130, 24.0200], // Нижній правий кут
                    [49.8080, 24.0250],
                    [49.8030, 24.0200], // Нижній лівий кут
                    [49.7980, 24.0100],
                    [49.8030, 23.9950],
                ]

            ]
        }
    ];

    const reverseGeocode = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
            );
            const data = await response.json();

            if (data && data.address) {
                const { house_number, road, city, country } = data.address;
                const fullAddress = `${road || ''} ${house_number || ''}, ${city || ''}, ${country || ''}`;
                setAddress(fullAddress);
                // console.log('Точна адреса будинку:', fullAddress);
            } else {
                setAddress('Адресу не знайдено');
                console.log('Адресу не знайдено для координат:', lat, lon);
            }
        } catch (error) {
            console.error('Помилка зворотного геокодування:', error);
            setAddress('Помилка при отриманні адреси');
        }
    };

    // Отримання поточної геолокації
    // const getCurrentLocation = () => {
    //     if (!navigator.geolocation) {
    //         alert('Геолокація не підтримується вашим браузером');
    //         return;
    //     }

    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setPosition([latitude, longitude]);
    //             reverseGeocode(latitude, longitude); // Отримуємо точну адресу
    //             if (mapRef.current) {
    //                 mapRef.current.setView([latitude, longitude], 15);
    //             }
    //         },
    //         (error) => {
    //             console.error('Помилка отримання геолокації:', error);
    //             switch (error.code) {
    //                 case error.PERMISSION_DENIED:
    //                     alert('Будь ласка, дозвольте доступ до геолокації у вашому браузері.');
    //                     break;
    //                 case error.POSITION_UNAVAILABLE:
    //                     alert('Інформація про місцезнаходження недоступна.');
    //                     break;
    //                 case error.TIMEOUT:
    //                     alert('Час очікування відповіді геолокації закінчився.');
    //                     break;
    //                 default:
    //                     alert('Невідома помилка при отриманні геолокації.');
    //             }
    //         },
    //         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    //     );
    // };

    return (
        <>
            <MapContainer
                center={[49.8397, 24.0297]}
                zoom={12}
                style={{ height: '500px', width: '100%', }}
                ref={mapRef}
                zoomControl={false}

            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {deliveryZones.map((zone, index) => (
                    <Polygon key={index} pathOptions={{ color: zone.color }} positions={zone.coordinates} />
                ))}
                <Marker
                    position={position}
                    draggable={true}
                    icon={customMarker}

                    eventHandlers={{
                        dragend: (e) => {
                            const { lat, lng } = e.target.getLatLng();
                            setPosition([lat, lng]);
                            reverseGeocode(lat, lng);
                        },
                    }}
                />

                <Marker
                    position={[49.8096, 24.0103]} /// Фіксована адреса магазину
                    icon={customMarkerShop} // Іконка для маркера
                    draggable={false} // Невідповідно для нерухомого маркера
                />
                <ZoomControl position="topright" className="custom-zoom-control" />
            </MapContainer>

        </>
    )
}
